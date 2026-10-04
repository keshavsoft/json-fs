import tally from "./tally.js";
tally.masters.units.all()
const result = await tally.masters.units.all({
    from: "2026-04-01",
    to: "2026-04-30"
});

console.log("RESULT:");
console.log(result);