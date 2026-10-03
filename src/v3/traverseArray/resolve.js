import { traverse } from "../traverse.js";

/**
 * resolveNode (v2)
 *
 * Resolves one item from a children array.
 * Passes the current output path, relative path, and instruction JSON down to traverse.
 */
const resolveNode = ({ inNode, inOutPath, inRelativePath, inInstructionJson } = {}) => {
    return traverse({ inNode, inOutPath, inRelativePath, inInstructionJson });
};

export { resolveNode };
export default resolveNode;
