import React from "react";
import Node from "./Node";

export default function Tree({ directories }) {
  let aNodesDirs = directories.map((node) => {
    let aNodesDir = node.nodes.directories;
    let iNumFiles = node.nodes.numFiles;
    aNodesDir = aNodesDir.map((nodeS) => {
      let aNodes = nodeS.nodes.directories;
      let iNumFiles = nodeS.nodes.numFiles;
      let sPath = `${node.name}/${nodeS.name}`;
      return <Node name={nodeS.name} numFiles={iNumFiles} numDirs={aNodes.length} path={sPath} key={sPath} />;
    });
    return (
      <div className="flex flex-col">
        <Node name={node.name} numFiles={iNumFiles} numDirs={aNodesDir.length} path={`/${node.name}`} />
        {aNodesDir.length ? (
          <div className="flex flex-col gap-3 ml-5 pl-2 mt-5 border-l-[#D9D9D9] border-l-[1px]">
            {aNodesDir}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  });
  return (
    <section className="bg-[#3F3838] w-10/12 h-1/2 p-5 flex rounded-sm md:w-1/2 overflow-y-auto">
      <div className="flex flex-col gap-5">{aNodesDirs} </div>
      {/* <div className="bg-red-400 w-1/3 h-1/3"></div> */}
    </section>
  );
}
