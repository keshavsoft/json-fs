import tally from "./index.js";

const units = await tally.masters.units.fetch();

console.log(units);
