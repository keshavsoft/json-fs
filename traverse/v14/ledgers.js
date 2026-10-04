import tally from "./index.js";

const units = await tally.masters.ledgers.withGstDetails();
console.log("UNITS:");
console.log(units);
