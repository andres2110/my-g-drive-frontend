import { createContext, useReducer, useEffect, useState } from "react";
import { directoriesReducer, initialState } from "../reducer/directoriesReducer";
import { ACTIONS, GET_API } from "../constants";
export const DirsContext = createContext(null);
// export const DirsDispatchContext = createContext(null);

export function DirsProvider({ children }) {
  const [state, fnDispatch] = useReducer(directoriesReducer, initialState);
  const [reload, setReload] = useState(false);
  const [parentPath, setParentPath] = useState("");
  const fnLoadDirs = async () => {
    try {
      let res = await fetch(GET_API, {
        method: "GET",
      });
      let oData = await res.json();
      fnDispatch({
        type: ACTIONS.dirs_success,
        dirs: oData.directories,
        currentId: parentPath,
      });
    } catch (error) {
      console.error(error);
      fnDispatch({
        type: ACTIONS.dirs_error,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    fnLoadDirs();
  }, [reload]);

  return (
    <DirsContext.Provider value={{ state, fnDispatch, setReload, setParentPath }}>
      {/* <DirsDispatchContext.Provider value={fnDispatch}>{children}</DirsDispatchContext.Provider> */}
      {children}
    </DirsContext.Provider>
  );
}
