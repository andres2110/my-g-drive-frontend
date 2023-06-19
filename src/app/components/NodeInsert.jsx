import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDirs } from "../hooks/useDirs";
import { ACTIONS } from "../constants";
import { usePath } from "../hooks/usePath";
import { useParams } from "next/navigation";

const NodeInsert = ({ name, id, path }) => {
  const [bShow, setShow] = useState(false);
  const { fnDispatch } = useDirs();
  const { path: currentPath, fnChangePath } = usePath();
  const oInputName = useRef();
  const { id: sCurrentId } = useParams();
  const fnUpdate = () => {
    let sValue = oInputName.current.value;
    fnDispatch({
      type: ACTIONS.updateName,
      id: id,
      name: sValue,
    });
    setShow(true);
  };
  const fnDelete = () => {
    if (path === currentPath) {
      fnChangePath("");
    }
    let sId = sCurrentId || "";
    fnDispatch({
      type: ACTIONS.delete,
      id: id,
      currentId: sId,
    });
  };

  return (
    <div className="flex gap-2  items-center">
      {bShow ? (
        <h5 className=" text-white" onDoubleClick={() => setShow(!bShow)}>
          {name}
        </h5>
      ) : (
        <>
          <input
            type="text"
            capture
            defaultValue={name}
            className="rounded-lg w-1/2 bg-transparent text-[#c1d19c] text-base h-6"
            ref={oInputName}
            // onBlur={fnUpdate}
          />
          <FontAwesomeIcon icon={faCheck} color="#9cd1a9" onClick={fnUpdate} />
        </>
      )}

      <FontAwesomeIcon icon={faTimes} color="red" onClick={fnDelete} />
    </div>
  );
};
export default NodeInsert;
