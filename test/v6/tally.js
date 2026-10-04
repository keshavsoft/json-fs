import source from "./source.json" with {type: "json"};
import buildTree from "./buildTree.js";

const tally = buildTree(source.tally ?? source);

export default tally;
