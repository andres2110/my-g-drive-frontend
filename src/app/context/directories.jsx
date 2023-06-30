import { createContext, useReducer, useEffect, useState } from "react";
import { directoriesReducer, initialState } from "../reducer/directoriesReducer";
import { ACTIONS, GET_API } from "../constants";
import { useParams } from "next/navigation";

export const DirsContext = createContext(null);
// export const DirsDispatchContext = createContext(null);

export function DirsProvider({ children }) {
  const [state, fnDispatch] = useReducer(directoriesReducer, initialState);
  const [reload, setReload] = useState(false);
  const fnLoadDirs = async () => {
    try {
      fnDispatch({
        type: ACTIONS.dirs_initial,
      });
      let res = await fetch(GET_API, {
        method: "GET",
      });
      let oData = await res.json();
      fnDispatch({
        type: ACTIONS.dirs_success,
        dirs: oData.directories,
      });
    } catch (error) {
      //Error
      fnDispatch({
        type: ACTIONS.dirs_error,
      });
    }
  };

  useEffect(() => {
    fnLoadDirs();
  }, [reload]);

  return (
    <DirsContext.Provider value={{ state, fnDispatch, setReload }}>
      {/* <DirsDispatchContext.Provider value={fnDispatch}>{children}</DirsDispatchContext.Provider> */}
      {children}
    </DirsContext.Provider>
  );
}
