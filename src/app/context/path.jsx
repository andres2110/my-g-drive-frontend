import { createContext, useState, useCallback, useId } from "react";

export const PathContext = createContext(null);

export function PathProvider({ children }) {
  const [path, setPath] = useState("");
  const [stack, setStack] = useState([""]);

  const fnChangePath = (sNewPath) => {
    setPath((pPath) => {
      if (pPath === sNewPath) {
        let iIndex = stack.length - 1;
        return stack[iIndex];
      }
      console.log(sNewPath);
      return sNewPath;
    });
  };
  const fnValidateSelect = (sNewPath) => {
    console.log(sNewPath);
    setPath(sNewPath);
  };
  const fnRefresh = () => {
    setStack([""]);
    setPath("");
  };
  const fnGoNode = (sPath) => {
    setStack((pStack) => {
      pStack.push(sPath);
      let iIndex = pStack.length - 1;
      fnValidateSelect(pStack[iIndex]);
      return pStack;
    });
  };
  const fnBackNode = () => {
    setStack((pStack) => {
      pStack.pop();
      let iIndex = pStack.length - 1;
      fnValidateSelect(pStack[iIndex]);
      return pStack;
    });
  };
  return (
    <PathContext.Provider
      value={{
        path,
        fnChangePath,
        fnGoNode,
        fnBackNode,
        fnRefresh,
        stack,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
