import { ACTIONS, MODES } from "../constants";
import { fnTransformDirs } from "./utils";
import { v4 } from "uuid";
// import { directories as DIRS } from "../mocks/files.json";
// let aDirs = fnTransformDirs(DIRS);
export const initialState = {
  dirs: [],
  // originalDirs: aDirs,
  originalDirs: [],
  selectedId: "",
  nodesInserted: 0,
  status: MODES.loading,
  error: "",
};
export function directoriesReducer(state, action) {
  const { type, id, path, name, currentId, dirs, error } = action;
  switch (type) {
    case ACTIONS.dirs_initial:
      return {
        ...state,
        status: MODES.loading,
      };
    case ACTIONS.dirs_success: {
      let aDirs = fnTransformDirs(dirs);
      let aInitTree = fnGetTree(currentId, aDirs);
      return {
        ...state,
        originalDirs: aDirs,
        selectedId: "",
        dirs: aInitTree,
        status: MODES.success,
        nodesInserted: 0,
      };
    }
    case ACTIONS.dirs_error: {
      return {
        ...state,
        status: MODES.error,
        error: error,
      };
    }
    case ACTIONS.updateTree:
      let aTree = fnGetTree(id, state.originalDirs);
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
      if (state.nodesInserted >= ACTIONS.maxNodes) {
        return {
          ...state,
          nodesInserted: ACTIONS.maxNodes,
        };
      }
      let sInsertId = state.selectedId === "" ? currentId : state.selectedId; //Si tengo uno seleccionado, escogo esa, sino es la path actual
      let aInserted = fnInserNode(state.originalDirs, path, sInsertId);
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
      let iNodeInserted = state.nodesInserted === 0 ? 0 : --state.nodesInserted;
      return {
        ...state,
        originalDirs: aNewDirs,
        dirs: newTree,
        nodesInserted: iNodeInserted,
      };
    case ACTIONS.updateName:
      let aUpdateDirs = fnUpdateName(id, name, state.originalDirs);
      return {
        ...state,
        originalDirs: aUpdateDirs,
        dirs: fnGetTree(currentId, aUpdateDirs),
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
  //TODO: a primer nivel
  const fnNewPath = (sPath, sName) => {
    let aSplit = sPath.split("/");
    // aSplit = aSplit.slice(1, aSplit.length);
    // aSplit[aSplit.length - 1] = sName;
    // let sNewPath = "";
    // aSplit.forEach((name) => (sNewPath = `${sNewPath}/${name}`));

    let sNewPath = sPath.replace(aSplit[aSplit.length - 1], sName);
    return sNewPath;
  };

  const fnUpdateRecursive = (sId, sName, aDirs) => {
    for (let i = 0; i < aDirs.length; i++) {
      const oDir = aDirs[i];
      if (oDir.id === sId) {
        let sNewPath = fnNewPath(oDir.path, sName);
        aDirs[i].path = sNewPath;
        aDirs[i].name = sName;
        return true;
      }
      let aNodes = oDir.nodes;
      if (aNodes.length) {
        fnUpdateRecursive(sId, sName, aNodes);
      }
    }
  };
  let aNewDirs = structuredClone(aDirs);
  fnUpdateRecursive(sId, sName, aNewDirs);
  return aNewDirs;
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
      path: "/New",
      id: v4(),
      mode: MODES.inserted,
      name: "New",
      nodes: [],
    });
    return aNewDirs;
  }
  let oNode = {
    path: `${path}/New`,
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
