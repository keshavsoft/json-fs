import jsonFs from "../src/index.js";
import sourceJson from "./tallyMastersSource.json" with { type: "json" };
import instructionsJson from "./instructions.json" with { type: "json" };

const run = () => {
    jsonFs({
        inSourceJson: sourceJson,
        inInstructionJson: instructionsJson,
        inOutDir: "./dist"
    });
};

run();
