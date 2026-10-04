import tally from "./index.js";

const units = await tally.masters.units.fetch();
console.log("UNITS:");
console.log(units);

const stockItems = await tally.masters.stockItems.withBatches();
console.log("STOCK ITEMS WITH BATCHES:");
console.log(stockItems);
