import tally from "./index.js";

const units = await tally.masters.units.fetch("mani9");
console.log("UNITS:");
console.log(units);
