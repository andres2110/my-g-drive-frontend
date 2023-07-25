import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { usePath } from "../hooks/usePath";
import TreeNodes from "./TreeNodes";
import { useDirs } from "../hooks/useDirs";
import { ACTIONS } from "../constants";

export default function Tree() {
  const { path, fnBackNode, sParentPath, stack } = usePath();
  const { state, fnDispatch } = useDirs();
  const { dirs: aDirectories, selectedId: sSelected } = state;
  const fnAddDir = () => {
    fnDispatch({
      type: ACTIONS.insert,
      path: path,
      currentId: sParentPath,
    });
  };
  const fnGoBack = () => {
    let sPath = fnBackNode();
    fnDispatch({
      type: ACTIONS.updateTree,
      id: sPath,
    });
    fnDispatch({
      type: ACTIONS.select,
      id: "",
    });

  };
  return (
    <section className="h-3/6 w-10/12 md:w-1/2 py-5 rounded-sm z-0 bg-[#3F3838]">
      {stack.length > 1 ? (
        <FontAwesomeIcon icon={faArrowLeft} className="absolute" onClick={fnGoBack} />
      ) : (
        <></>
      )}
      {/* <FontAwesomeIcon icon={faArrowLeft} className="absolute" onClick={fnGoBack} />  */}
      <TreeNodes directories={aDirectories} selectedId={sSelected} />
      <div className="z-10 flex justify-end">
        <FontAwesomeIcon icon={faCirclePlus} size="2xl" color="#58DE66" onClick={fnAddDir} />
      </div>
    </section>
  );
}
