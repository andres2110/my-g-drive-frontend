"use client";
import React from "react";
import { usePath } from "../hooks/usePath";

export default function Node({ name, numFiles, numDirs, path }) {
  const [isSelected, setSelected] = React.useState(false);
  const { fnChangePath } = usePath();
  const fnHandleClick = () => {
    let sPath = isSelected ? "" : path; // Si es true va ser false
    fnChangePath(setSelected,sPath);
    setSelected(!isSelected);
  };
  const fnHandleDoubleClick = () => {
    console.log(isSelected);
  };
  // const sColor = isSelected ? "#9CD1CE" : "#D9D9D9"; -> Investigar por que no funciona
  const sDivClass = isSelected ? "bg-[#9CD1CE] w-6 h-6" : "bg-[#D9D9D9] w-6 h-6";
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <div className={sDivClass} onClick={fnHandleClick} onDoubleClick={fnHandleDoubleClick}></div>
        <h5 className="text-white"> {name} </h5>
        <small className="bg-[#D9D9D9] text-black rounded-md px-1 text-xs">
          Files: {numFiles} Dirs: {numDirs}
        </small>
      </div>
    </div>
  );
}
