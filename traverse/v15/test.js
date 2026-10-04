import tally from "./index.js";

const company = "mani9";

const units = await tally.masters.units.fetch(company);
console.log("UNITS:");
console.log(units);

const stockItems = await tally.masters.stockItems.withBatches(company);
console.log("STOCK ITEMS WITH BATCHES:");
console.log(stockItems);

const ledgers = await tally.masters.ledgers.withGstDetails(company);
console.log("LEDGERS WITH GST DETAILS:");
console.log(ledgers);
