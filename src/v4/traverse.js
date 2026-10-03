import { traverseArray } from "./traverseArray/index.js";
import traverseObject from "./traverseObject/index.js";

/**
 * traverse (v2)
 *
 * Central dispatcher.
 * Accepts { inNode, inOutPath, inRelativePath, inInstructionJson }
 */
const traverse = ({ inNode, inOutPath, inRelativePath = "", inInstructionJson = {} } = {}) => {
    if (inNode === null || inNode === undefined) return;

    if (Array.isArray(inNode)) {
        return traverseArray({ inItems: inNode, inOutPath, inRelativePath, inInstructionJson });
    }

    if (typeof inNode === "object") {
        return traverseObject({ inNode, inOutPath, inRelativePath, inInstructionJson });
    }

    // primitive — nothing to do at traversal level
    return;
};

export { traverse };
export default traverse;
