import { traverseArray } from "./traverseArray/index.js";
import traverseObject from "./traverseObject/index.js";

/**
 * traverse (v1)
 *
 * Central dispatcher — mirrors the json-transformer v6 traversal boundary.
 * Instead of building DOM nodes, each branch writes folders/files to disk.
 *
 * Accepts a single node from the source JSON tree.
 */
const traverse = (inNode, inOutPath) => {
    if (inNode === null || inNode === undefined) return;

    if (Array.isArray(inNode)) {
        return traverseArray(inNode, inOutPath);
    }

    if (typeof inNode === "object") {
        return traverseObject(inNode, inOutPath);
    }

    // primitive — nothing to do at traversal level
    return;
};

export { traverse };
export default traverse;
