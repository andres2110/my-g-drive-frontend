import { createContext, useState } from "react";

export const PathContext = createContext(null);

export function PathProvider({ children }) {
  const [path, setPath] = useState("");
  const [stack, setStack] = useState([""]);
  const sParentPath = stack[stack.length - 1];

  const fnChangePath = (sNewPath) => {
    setPath((pPath) => {
      if (pPath === sNewPath) {
        let iIndex = stack.length - 1;
        return stack[iIndex];
      }
      return sNewPath;
    });
  };
  const fnRefresh = () => {
    console.log(sParentPath);
    setPath(sParentPath);
  };
  const fnGoNode = (sPath) => {
    setStack((pStack) => {
      pStack.push(sPath); //Uso el valor anterior
      setPath(sPath);
      return pStack;
    });
  };
  const fnBackNode = () => {
    let pStack = [...stack]; //OJO: estoy mutando porque necesito el valor actual para hacer updateTree
    pStack.pop();
    let iIndex = pStack.length - 1;
    setPath(pStack[iIndex]);
    setStack(pStack);
    return pStack[iIndex];
  };
  return (
    <PathContext.Provider
      value={{
        path,
        fnChangePath,
        fnGoNode,
        fnBackNode,
        fnRefresh,
        sParentPath,
        stack
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
