import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { usePath } from "../hooks/usePath";
import TreeNodes from "./TreeNodes";
import { useDirs } from "../hooks/useDirs";
import { ACTIONS } from "../constants";
import { useRouter, useParams } from "next/navigation";

export default function Tree({ first }) {
  const { path, fnBackNode } = usePath();
  const oRouter = useRouter();
  const { state, fnDispatch } = useDirs();
  const { dirs: aDirectories, selectedId: sSelected } = state;
  const { id } = useParams();
  const fnAddDir = () => {
    let sId = id || "";
    fnDispatch({
      type: ACTIONS.insert,
      path: path,
      currentId: sId,
    });
  };
  const fnGoBack = () => {
    fnBackNode();
    oRouter.back();
  };
  return (
    <section className="h-3/6 w-10/12 md:w-1/2 py-5 rounded-sm z-0 bg-[#3F3838]">
      {!first ? <FontAwesomeIcon icon={faArrowLeft} className="absolute" onClick={fnGoBack} /> : <></>}
      <TreeNodes directories={aDirectories} selectedId={sSelected} />
      <div className="z-10 flex justify-end">
        <FontAwesomeIcon icon={faCirclePlus} size="2xl" color="#58DE66" onClick={fnAddDir} />
      </div> 
    </section>
  );
}
