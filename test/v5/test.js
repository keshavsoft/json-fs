import source from "./source.json" with { type: "json" };
import getByPath from "./getByPath.js";

const path = "masters.units";

const result = getByPath(source, path);

console.log(result);