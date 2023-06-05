import { createContext, useReducer } from "react";
import { directoriesReducer, initialState } from "../reducer/directoriesReducer";

export const DirsContext = createContext(null);
// export const DirsDispatchContext = createContext(null);

export function DirsProvider({ children }) {
  const [state, fnDispatch] = useReducer(directoriesReducer, initialState);
  return (
    <DirsContext.Provider value={{ state, fnDispatch }}>
      {/* <DirsDispatchContext.Provider value={fnDispatch}>{children}</DirsDispatchContext.Provider> */}
      {children}
    </DirsContext.Provider>
  );
}
