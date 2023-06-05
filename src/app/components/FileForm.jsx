import React from "react";
import { UPLOAD_API } from "../constants";

export default function FileForm() {
  const [files, setFiles] = React.useState(null);

  const fnUpload = async () => {
    if (files === null || files.length === 0) return; //TODO: Message Error
    let oFormData = new FormData();
    oFormData.append("filename", "test");
    oFormData.append("path", "test");
    for (let oFile of files) {
      oFormData.append("files_up", oFile);
    }
    try {
      const oResponse = await fetch(UPLOAD_API, {
        method: "POST",
        body: oFormData,
      });
      if (oResponse.status === 200) {
        alert("Upload with success");
      }
      if (oResponse.status === 500) {
        alert(oResponse.statusText);
      }
      if (oResponse.status !== 200 && oResponse.status !== 500) alert("The server not response");
    } catch (error) {
      alert("The server not response");
    }
  };
  const fnUpdateFiles = (oEvent) => {
    setFiles(oEvent.target.files);
  };
  return (
    <section className="w-1/2 h-15 mt-4 items-center flex flex-col gap-2">
      <input
        type="file"
        name="files_up"
        accept="image/*,video/*"
        multiple
        className=" bg-none w-2/3 md:w-1/3 md:bg-[#D9D9D9]"
        onChange={fnUpdateFiles}
      />
      <button
        type="submit"
        className="bg-[#3F3838] text-white w-1/3 hover:bg-[#D9D9D9] hover:text-black rounded-md"
        onClick={fnUpload}
      >
        SUBMIT
      </button>
    </section>
  );
}
