import React from "react";
import Node from "./Node";

export default function TreeNodes({ directories, selectedId }) {
  let aNodesDirs = directories.map((oDir) => {
    let aNodesDir = oDir.nodes;
    //Child Level
    aNodesDir = aNodesDir.map((oNode) => {
      const { name, numFiles, numDirs, path, mode, id } = oNode;
      return (
        <Node
          name={name}
          numFiles={numFiles}
          path={path}
          mode={mode}
          numDirs={numDirs}
          id={id}
          selected={selectedId === oNode.id}
          key={id}
        />
      );
    });
    const { name, numFiles, numDirs, path, mode, id } = oDir;
    //Parent Level
    return (
      <div className="flex flex-col" key={oDir.id}>
        <Node
          name={name}
          numFiles={numFiles}
          path={path}
          mode={mode}
          numDirs={numDirs}
          id={id}
          selected={selectedId === oDir.id}
        />
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

  return <div className="flex flex-col gap-5">{aNodesDirs}</div>;
}
