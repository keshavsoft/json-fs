import { traverse } from "../traverse.js";

/**
 * resolveNode (v1)
 *
 * Resolves one item from a children array.
 * Passes the current output path down to traverse.
 */
const resolveNode = (inNode, inOutPath) => {
    return traverse(inNode, inOutPath);
};

export { resolveNode };
export default resolveNode;
