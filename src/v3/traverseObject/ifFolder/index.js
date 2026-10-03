import path from "path";
import { mkdirSync } from "fs";
import { traverseArray } from "../../traverseArray/index.js";

const ifFolder = ({ inNode, inOutPath, inRelativePath, inInstructionJson } = {}) => {
    const localName = inNode?.name;
    const localChildren = inNode?.children;

    const localFullPath = path.join(inOutPath, localName);
    const localCurrentRelativePath = inRelativePath ? `${inRelativePath}/${localName}` : localName;

    mkdirSync(localFullPath, { recursive: true });
    console.log(`  📁 created folder: ${localFullPath}`);

    if (Array.isArray(localChildren) && localChildren.length > 0) {
        traverseArray({
            inItems: localChildren,
            inOutPath: localFullPath,
            inRelativePath: localCurrentRelativePath,
            inInstructionJson
        });
    }
};

export default ifFolder;
