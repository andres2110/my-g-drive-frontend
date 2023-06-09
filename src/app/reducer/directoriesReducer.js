import { ACTIONS, MODES } from "../constants";
import { directories as DIRS } from "../mocks/files.json";
import { fnTransformDirs } from "./utils";
import { v4 } from "uuid";

let aDirs = fnTransformDirs(DIRS);
export const initialState = {
  dirs: aDirs,
  selectedId: "",
  nodesInserted: 0,
};
export function directoriesReducer(state, action) {
  const { type, id, path, name } = action;
  switch (type) {
    case ACTIONS.select:
      let sId = state.selectedId === id ? "" : id;
      return {
        ...state,
        selectedId: sId,
      };
    case ACTIONS.insert:
      if (state.nodesInserted === ACTIONS.maxNodes) {
        return {
          ...state,
        };
      }
      fnInserNode(state.dirs, path);
      return {
        ...state,
        nodesInserted: ++state.nodesInserted,
      };

    case ACTIONS.delete:
      let aNewDirs = fnDeleteNode(state.dirs, id);
      return {
        ...state,
        dirs: aNewDirs,
        nodesInserted: --state.nodesInserted,
      };
    case ACTIONS.updateName:
      fnUpdateName(id, name, state.dirs);
      return {
        ...state,
      };
  }
}
const fnUpdateName = (sId, sName, aDirs) => {
  let bUpdate = false;

  aDirs.forEach((oDir) => {
    if (oDir.id === sId) {
      oDir.name = sName;
      oDir.path = sName;
      bUpdate = true;
    }
  });
  if (bUpdate) {
    return;
  }

  aDirs.forEach((oDir) => {
    let aNewNodes = oDir?.nodes;
    aNewNodes = aNewNodes.forEach((oNode) => {
      if (oNode.id === sId) {
        oNode.name = sName;
        let aSplit = oNode.path.split("/");
        aSplit = aSplit.slice(1, aSplit.length);
        aSplit[aSplit.length - 1] = sName;
        let sPath = "";
        aSplit.forEach((name) => (sPath = `${sPath}/${name}`));
        oNode.path = sPath;
      }
    });
  });
};

const fnInserNode = (aDirs, path) => {
  if (path === "") {
    //Primer nivel
    aDirs.push({
      path: "New",
      id: v4(),
      mode: MODES.inserted,
      name: "New",
      nodes: [],
    });
    // return aDirs
  }
  let oNode = {
    path: `${path}/new`,
    id: v4(),
    mode: MODES.inserted,
    name: "New",
    nodes: [],
  };
  aDirs.forEach((oDir) => {
    //LIMITO la busqueda solo al segundo nivel
    if (oDir.path === path) {
      oDir.nodes.push(oNode);
      return;
    }
  });
};
const fnDeleteNode = (aDirs, id) => {
  let iLength = aDirs.length;
  let aNewDirs = aDirs.filter((oDir) => oDir.id !== id);
  if (iLength !== aNewDirs.length) {
    // Primer nivel
    return aNewDirs;
  }
  aNewDirs = aDirs.map((oDir) => {
    //Busqueda en segundo nivel
    let aNewNodes = oDir.nodes.filter((oNode) => oNode.id !== id);
    return {
      ...oDir,
      nodes: aNewNodes,
    };
  });
  return aNewDirs;
};
