import React from "react";

export default function InputNameFile({ onClose, onUpload, setFilesName }) {
  const oInputName = React.useRef();
  const fnHandleSubmit = () => {
    onClose();
    onUpload();
    setFilesName(oInputName.current.value);
  };
  return (
    <>
      <div className="top-0 left-0 z-0 w-screen h-screen fixed bg-[#201e1ed2] "></div>
      <div className="w-1/2 h-1/4 md:w-1/5 bg-[#201E1E] absolute z-10 self-center top-1/3 flex flex-col items-center justify-center gap-5">
        <p className="text-white text-sm">Enter the name of the files</p>
        <input type="text" className="w-3/4 text-sm" ref={oInputName} />
        <div className="flex w-full gap-4 justify-center">
          <button
            type="submit"
            className="bg-[#58DE66] w-1/3 md:w-1/5   hover:bg-[#04ff43] rounded-md text-xs"
            onClick={fnHandleSubmit}
          >
            Upload
          </button>
          <button
            type="submit"
            className="bg-[#de6158] w-1/3 md:w-1/5 text-white  hover:bg-[#ec1c0d] hover:text-yellow-50 rounded-md text-xs"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
