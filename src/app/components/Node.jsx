"use client";
import React from "react";
import { usePath } from "../hooks/usePath";
import { useDirs } from "../hooks/useDirs";
import { ACTIONS, COLORS, MODES } from "../constants";
import NodeInsert from "./NodeInsert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Node({ name, numFiles, numDirs, path, mode, selected, id }) {
  const { fnChangePath, fnGoNode } = usePath();
  const { fnDispatch } = useDirs();
  const oColors = COLORS;
  let sMode = selected ? MODES.selected : mode;
  let sDivClass = oColors[sMode];
  let bDisplay = mode === MODES.displayed;

  const fnHandleClick = () => {
    fnChangePath(path);
    fnDispatch({
      type: ACTIONS.select,
      id: id,
    });
  };
  const fnGoToNode = () => {
    fnGoNode(path);
    fnDispatch({
      type: ACTIONS.updateTree,
      id: id,
    });
    //Borrar el seleccionado
    fnDispatch({
      type: ACTIONS.select,
      id: "",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <div className={sDivClass} onClick={fnHandleClick}></div>
        {bDisplay ? (
          <NodeDisplay numDirs={numDirs} numFiles={numFiles} name={name} />
        ) : (
          <NodeInsert name={name} id={id} path={path} />
        )}
        <FontAwesomeIcon icon={faEye} color="#25cec0" size="xs" onClick={fnGoToNode} />
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
