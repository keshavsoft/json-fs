import source from "./source.json" with { type: "json" };

import traverse from "./traverse.js";

const k1 = traverse(source, "", "tally.masters.units.fetch");

console.log("aaaaa : ", k1);
