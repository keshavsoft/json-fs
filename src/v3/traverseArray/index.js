import { resolveNode } from "./resolve.js";

/**
 * traverseArray (v2)
 *
 * Iterates a children array and resolves each node.
 * Mirrors json-transformer v6 traverseArray shape.
 */
const traverseArray = ({ inItems, inOutPath, inRelativePath, inInstructionJson } = {}) => {
    if (!Array.isArray(inItems)) return;

    inItems.forEach((item) =>
        resolveNode({
            inNode: item,
            inOutPath,
            inRelativePath,
            inInstructionJson
        })
    );
};

export { traverseArray };
export default traverseArray;
