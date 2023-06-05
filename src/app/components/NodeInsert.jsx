import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDirs } from "../hooks/useDirs";

const NodeInsert = ({ name, id }) => {
  const { fnDispatch } = useDirs();
  const fnUpdate = (e) => {
    console.log({ e });
  };
  const fnDelete = () => {
    fnDispatch({
      type: "deleted",
      id: id,
    });
  };

  return (
    <div className="flex gap-2  items-center">
      <input
        type="text"
        placeholder="Dirname"
        className="text-xs rounded-lg p-1 w-15 bg-transparent text-[#9cd1a9]"
      />
      <FontAwesomeIcon icon={faCheck} color="#9cd1a9" />
      <FontAwesomeIcon icon={faTimes} color="red" onClick={fnDelete} />
    </div>
  );
};
export default NodeInsert;
