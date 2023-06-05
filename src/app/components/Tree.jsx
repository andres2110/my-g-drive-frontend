import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { usePath } from "../hooks/usePath";
import TreeNodes from "./TreeNodes";
import { useDirs } from "../hooks/useDirs";

export default function Tree() {
  const { path } = usePath();
  const { state, fnDispatch } = useDirs();
  const { dirs: aDirectories, selectedId: sSelected } = state;
  const fnAddDir = () => {
    fnDispatch({
      type: "inserted",
      path: path,
    });
  };
  return (
    <section className="bg-[#3F3838] w-10/12 h-1/2 p-5 flex rounded-sm md:w-1/2 overflow-y-auto relative">
      <TreeNodes directories={aDirectories} selectedId={sSelected} />
      <div className=" w-1/5 h-1/5 absolute bottom-0 end-0 flex items-end justify-end p-3">
        <FontAwesomeIcon icon={faCirclePlus} size="2xl" color="#58DE66" onClick={fnAddDir} />
      </div>
    </section>
  );
}
