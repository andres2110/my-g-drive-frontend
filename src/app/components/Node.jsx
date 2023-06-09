"use client";
import React, { useContext } from "react";
import { usePath } from "../hooks/usePath";
import { useDirs } from "../hooks/useDirs";
import { ACTIONS, COLORS, MODES } from "../constants";
import NodeInsert from "./NodeInsert";

export default function Node({ name, numFiles, numDirs, path, mode, selected, id }) {
  const { fnChangePath } = usePath();
  const { fnDispatch } = useDirs();
  const oColors = COLORS;
  const fnHandleClick = () => {
    fnChangePath(path);
    fnDispatch({
      type: ACTIONS.select,
      id: id,
    });
  };
  let sMode = selected ? MODES.selected : mode;
  let sDivClass = oColors[sMode];
  let bDisplay = mode === MODES.displayed;
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <div className={sDivClass} onClick={fnHandleClick}></div>
        {bDisplay ? (
          <NodeDisplay numDirs={numDirs} numFiles={numFiles} name={name} />
        ) : (
          <NodeInsert name={name} id={id} path={path}/>
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
