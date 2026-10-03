import jsonFs from "../src/index.js";
import sourceJson from "./source.json" with { type: "json" };

jsonFs({
    inSourceJson: sourceJson,
    inOutDir: "./dist"
});