import { createContext, useState, useCallback } from "react";

export const PathContext = createContext(null);

export function PathProvider({ children }) {
  const [path, setPath] = useState("");

  const fnChangePath = (sNewPath) => {
    setPath((pPath) => {
      if(pPath === sNewPath){
        return '';
      }
      return sNewPath;
    });
  };

  return (
    <PathContext.Provider
      value={{
        path,
        fnChangePath,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
