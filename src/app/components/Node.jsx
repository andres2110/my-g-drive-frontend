"use client";
import React, { useContext } from "react";
import { usePath } from "../hooks/usePath";
import { useDirs } from "../hooks/useDirs";
import { COLORS } from "../constants";
import NodeInsert from "./NodeInsert";

export default function Node({ name, numFiles, numDirs, path, mode, selected, id }) {
  const { fnChangePath } = usePath();
  const { fnDispatch } = useDirs();
  const oColors = COLORS;
  const fnHandleClick = () => {
    fnChangePath(path);
    fnDispatch({
      type: "selected",
      id: id,
    });
  };
  let sMode = selected ? "selected" : mode;
  let sDivClass = oColors[sMode];
  let bDisplay = mode === "display";
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <div className={sDivClass} onClick={fnHandleClick}></div>
        {bDisplay ? (
          <NodeDisplay numDirs={numDirs} numFiles={numFiles} name={name} />
        ) : (
          <NodeInsert name={name} id={id} />
        )}
      </div>
    </div>
  );
}

const NodeDisplay = ({ numFiles, numDirs, name }) => {
  return (
    <>
      <h5 className="text-white"> {name} </h5>
      <small className="bg-[#D9D9D9] text-black rounded-md px-1 text-xs">
        Files: {numFiles} Dirs: {numDirs}
      </small>
    </>
  );
};
