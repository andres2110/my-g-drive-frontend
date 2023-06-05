export const fnTransformDirs = (aDirs) => {
    // let aNewNodes = [];
    let aNewDirs = aDirs.map((oDir) => {
      let aNewDirs = [];
      let oOldNode = oDir.nodes;
      let aOldDirs = oOldNode.directories;
      if (aOldDirs.length) {
        aNewDirs = fnTransformDirs(aOldDirs);
      }
      let oNewNode = {
        ...oOldNode,
        directories: aNewDirs
      }
      return {
        path: oDir.path,
        id: oDir.id,
        nodes: oNewNode.directories,
        mode: "display",
        numFiles: oNewNode.numFiles,
        numDirs: oNewNode.directories.length,
        name: oDir.name
      };
    });
    return aNewDirs;
  };