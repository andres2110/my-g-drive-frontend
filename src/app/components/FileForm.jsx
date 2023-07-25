import React from "react";
import { UPLOAD_API } from "../constants";
import { usePath } from "../hooks/usePath";
import { useDirs } from "../hooks/useDirs";
import InputNameFile from "./InputNameFile";

export default function FileForm() {
  const [files, setFiles] = React.useState(null);
  const [showInput, setShowInput] = React.useState(false);
  const [filesName, setFilesName] = React.useState("");

  const { path, fnRefresh, sParentPath } = usePath();
  const { setReload, setParentPath } = useDirs();

  const fnPrepareUpload = () => {
    if (files === null || files.length === 0) {
      alert("Select files to upload");
      return;
    }
    if (path.toUpperCase().includes("NEW")) {
      alert("The path can't be have NEW");
      return;
    }
    setShowInput(true);
  };
  const fnUpload = async () => {
    let oFormData = new FormData();
    oFormData.append("filename", filesName);
    let sPath = path.replace("/", ""); //Remove the first '/' from path
    oFormData.append("path", path);

    for (let oFile of files) {
      oFormData.append("files_up", oFile);
    }
    try {
      const oResponse = await fetch(UPLOAD_API, {
        method: "POST",
        body: oFormData,
      });
      if (oResponse.status === 200) {
        setParentPath(sParentPath);
        setReload((pState) => !pState);
        alert("Upload with success");
        fnRefresh();
        setFiles(null);
      }
      if (oResponse.status === 500) {
        alert(oResponse.statusText);
      }
      if (oResponse.status !== 200 && oResponse.status !== 500) alert("The server not response");
    } catch (error) {
      alert("The server not response..");
    }
    finally{
      setFilesName('');
    }
  };
  const fnUpdateFiles = (oEvent) => {
    setFiles(oEvent.target.files);
  };
  return (
    <>
      {showInput && (
        <InputNameFile
          onClose={() => {
            setShowInput(false);
          }}
          onUpload={() => fnUpload()}
          setFilesName={setFilesName}
        />
      )}
      <section className="w-1/2 h-15 mt-4 items-center flex flex-col gap-2">
        <input
          type="file"
          name="files_up"
          accept="image/*,video/*"
          multiple
          className=" bg-none w-2/3 md:w-1/3 md:bg-[#D9D9D9]"
          onChange={fnUpdateFiles}
        />
      </section>
      {files?.length && <p className="text-white md:hidden">{files?.length} files selected</p>}
      <button
        type="submit"
        className="bg-[#58DE66] text-black w-1/2 md:w-1/5 hover:bg-[#04ff43] hover:text-black rounded-md"
        onClick={fnPrepareUpload}
      >
        SUBMIT
      </button>
    </>
  );
}
