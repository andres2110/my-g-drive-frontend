import { directories as DIRS } from "../mocks/files.json";
import { fnTransformDirs } from "./utils";
import { v4 } from "uuid";

let aDirs = fnTransformDirs(DIRS);
export const initialState = {
  dirs: aDirs,
  selectedId: "",
};

const fnInserNode = (aDirs, oNode, path) => {
  aDirs.forEach((oDir) => {
    //LIMITO la busqueda solo al primer nivel
    if (oDir.path === path) {
      oDir.nodes.push(oNode);
      return;
    }
    // if (oDir.nodes.length > 0) {
    //   fnInserNode(oDir.nodes, oNode, path);
    // }
    // console.log('Entro');
    // return{
    //   ...oDir,
    //   nodes: aTempDirs
    // }
  });
};

export function directoriesReducer(state, action) {
  const { type } = action;
  switch (type) {
    case "selected":
      const { id } = action;
      let sId = state.selectedId === id ? "" : id;
      return {
        ...state,
        selectedId: sId,
      };
    case "inserted":
      const { path } = action;
      let aPrevDir = state.dirs;
      if (path === "") {
        aPrevDir.push({
          path: "New",
          id: v4(),
          mode: "inserted",
          name: "New",
          nodes: [],
        });
        return {
          ...state,
          dirs: aPrevDir,
        };
      }
      let oNode = {
        path: `${path}/new`,
        id: v4(),
        mode: "inserted",
        name: "New",
        nodes: [],
      };
      fnInserNode(aPrevDir, oNode, path);
      return {
        ...state,
        dirs: aPrevDir,
      };

      break;
    case "deleted":
      let sIdDelete = action.id;
      let aNewDirs = state.dirs.filter((oDir)=> oDir.id !== sIdDelete)
      return{
        ...state,
        dirs: aNewDirs
      }
      break;
  }
}
