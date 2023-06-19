import { ACTIONS, MODES } from "../constants";
import { directories as DIRS } from "../mocks/files.json";
import { fnTransformDirs } from "./utils";
import { v4 } from "uuid";

let aDirs = fnTransformDirs(DIRS);
export const initialState = {
  dirs: [],
  originalDirs: aDirs,
  selectedId: "",
  nodesInserted: 0,
};
export function directoriesReducer(state, action) {
  const { type, id, path, name, currentId } = action;
  switch (type) {
    case ACTIONS.updateTree:
      let aTree = [];
      if (path === "") {
        aTree = structuredClone(state.originalDirs);
        return {
          ...state,
          dirs: aTree,
        };
      }
      aTree = fnGetTree(id, state.originalDirs);
      return {
        ...state,
        dirs: aTree,
      };

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
      let sInsertId = state.selectedId === "" ? currentId : state.selectedId;
      let aInserted = fnInserNode(state.originalDirs, path,sInsertId);
      let aNewTree = fnGetTree(currentId, aInserted);
      return {
        ...state,
        originalDirs: aInserted,
        dirs: aNewTree,
        nodesInserted: ++state.nodesInserted,
      };
    case ACTIONS.delete:
      let aNewDirs = fnDeleteNode(state.originalDirs, id);
      let newTree = fnGetTree(currentId, aNewDirs);
      return {
        ...state,
        originalDirs: aNewDirs,
        dirs: newTree,
        nodesInserted: --state.nodesInserted,
      };
    case ACTIONS.updateName:
      fnUpdateName(id, name, state.dirs);
      return {
        ...state,
      };
  }
}

const fnGetTree = (sId, aDirs) => {
  const fnSearchRecursive = (sId, aNodes) => {
    for (let i = 0; i < aNodes.length; i++) {
      const oNode = aNodes[i];
      if (oNode.id === sId) {
        return oNode.nodes;
      }
      if (oNode.nodes.length > 0) {
        const oTree = fnSearchRecursive(sId, oNode.nodes);
        if (oTree.length > 0) {
          return oTree;
        }
      }
    }
    return [];
  };
  let newDirs = aDirs;
  if (sId !== "") {
    newDirs = fnSearchRecursive(sId, aDirs);
  }
  return newDirs;
};

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

const fnInserNode = (aDirs, path, sId) => {
  const aNewDirs = structuredClone(aDirs);
  const fnInserRecursive = (aDirs, sId, oNode) => {
    for (let i = 0; i < aDirs.length; i++) {
      const oDir = aDirs[i];
      if (oDir.id === sId) {
        oDir.nodes.push(oNode);
        return true;
      }
      if (oDir.nodes.length > 0) {
        if (fnInserRecursive(oDir.nodes, sId, oNode)) {
          return true;
        }
      }
    }
    return false;
  };
  if (path === "") {
    //Primer nivel
    aNewDirs.push({
      path: "New",
      id: v4(),
      mode: MODES.inserted,
      name: "New",
      nodes: [],
    });
    return aNewDirs;
  }
  let oNode = {
    path: `${path}/new`,
    id: v4(),
    mode: MODES.inserted,
    name: "New",
    nodes: [],
  };
  fnInserRecursive(aNewDirs, sId, oNode);
  return aNewDirs;
};
const fnDeleteNode = (aDirs, sId) => {
  const fnDeleteRecursive = (oNodes, sId) => {
    let iLength = oNodes.nodes.length;
    let aNewNodes = oNodes.nodes.filter((oNode) => oNode.id !== sId);
    if (iLength !== aNewNodes.length) {
      oNodes.nodes = aNewNodes;
      return true;
    }
    let aDirs = oNodes.nodes;
    for (let i = 0; i < aDirs.length; i++) {
      const oDir = aDirs[i];
      if (fnDeleteRecursive(oDir, sId)) {
        return true;
      }
    }
    return false;
  };
  let aNewDirs = structuredClone(aDirs);
  let oNodes = { nodes: aNewDirs };

  fnDeleteRecursive(oNodes, sId);
  return oNodes.nodes;
};
