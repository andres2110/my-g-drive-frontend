import { createContext, useState } from "react";

export const PathContext = createContext(null);

export function PathProvider({ children }) {
  const [path, setPath] = useState("");
  const [fnDisableNode, setDisableNode] = useState(() => () => {});

  const fnChangePath = (fnSetPreviousNode, sNewPath) => {
    setDisableNode(() => fnSetPreviousNode);
    setPath(sNewPath);
    fnDisableNode();
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
