import jsonFs from "../../src/index.js";
import sourceJson from "./source.json" with { type: "json" };
import instructionsJson from "./instructions.json" with { type: "json" };

jsonFs({
    inSourceJson: sourceJson,
    inInstructionJson: instructionsJson,
    inOutDir: "./dist"
});