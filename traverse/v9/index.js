import source from "./source.json" with { type: "json" };

import traverse from "./traverse.js";

const result = await traverse(
    source,
    "",
    "tally.masters.units.fetch"
);

console.log("TALLY RESPONSE:");
console.log(result);