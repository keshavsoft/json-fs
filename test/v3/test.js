import path from "path";
import fs from "fs";

const sourceJson = JSON.parse(
    fs.readFileSync("./source.json", "utf8")
);

const jsonPath = process.argv[2];

if (!jsonPath) {
    console.log("Usage: node test.js masters.units.all");
    process.exit(1);
}

const parts = jsonPath.split(".");

let result = sourceJson;

for (const part of parts) {
    if (result === null || result === undefined || !(part in result)) {
        console.log(`Path not found: ${jsonPath}`);
        process.exit(1);
    }

    result = result[part];
}

console.log("JSON path:", jsonPath);
console.log("Resolved value:");
console.dir(result, { depth: null });
