import { resolveNode } from "./resolve.js";

/**
 * traverseArray (v1)
 *
 * Iterates a children array and resolves each node.
 * Mirrors json-transformer v6 traverseArray shape.
 */
const traverseArray = (inItems, inOutPath) => {
    if (!Array.isArray(inItems)) return;

    inItems.forEach((item) => resolveNode(item, inOutPath));
};

export { traverseArray };
export default traverseArray;
