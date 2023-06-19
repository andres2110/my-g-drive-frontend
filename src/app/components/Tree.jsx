import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { usePath } from "../hooks/usePath";
import TreeNodes from "./TreeNodes";
import { useDirs } from "../hooks/useDirs";
import { ACTIONS } from "../constants";
import { useRouter, useParams } from "next/navigation";

export default function Tree({ first }) {
  const { path } = usePath();
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
    oRouter.back();
  };
  return (
    <div className="h-2/3 w-10/12 md:w-1/2 relative bg-[#3F3838]">
      <section className="h-4/5 flex rounded-sm z-0 py-5 overflow-y-auto">
        {!first ? <FontAwesomeIcon icon={faArrowLeft} className="absolute" onClick={fnGoBack} /> : <></>}
        <TreeNodes directories={aDirectories} selectedId={sSelected} />
      </section>
      <div className=" absolute bottom-0 end-0 flex items-end justify-end p-3 z-10">
        <FontAwesomeIcon icon={faCirclePlus} size="2xl" color="#58DE66" onClick={fnAddDir} />
      </div>
    </div>
  );
}
