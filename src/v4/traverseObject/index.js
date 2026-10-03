import ifFolder from "./ifFolder/index.js";
import ifFile from "./ifFile/index.js";

const traverseObject = ({ inNode, inOutPath, inRelativePath = "", inInstructionJson = {} } = {}) => {
    const localName = inNode?.name;
    const localType = inNode?.type;

    if (!localName || !localType) return;

    if (localType === "folder") {
        return ifFolder({ inNode, inOutPath, inRelativePath, inInstructionJson });
    }

    if (localType === "file") {
        return ifFile({ inNode, inOutPath, inRelativePath, inInstructionJson });
    }

    console.warn(`  ⚠️  unknown type "${localType}" for node "${localName}" — skipped`);
};

export default traverseObject;
