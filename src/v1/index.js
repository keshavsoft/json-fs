import path from "path";
import { mkdirSync } from "fs";
import { traverse } from "./traverse.js";
import meta from "./meta.js";

/**
 * jsonFs (v1)
 *
 * Entry point. Takes:
 *   inSourceJson  — the source-of-truth JSON tree (folders/files spec)
 *   inOutDir      — absolute path to the output root (defaults to ./dist)
 *
 * Creates a clean dist/ folder and writes the entire tree to disk.
 */
const jsonFs = ({ inSourceJson, inOutDir = "dist" } = {}) => {
    if (!inSourceJson) {
        console.error("json-fs: inSourceJson is required");
        return;
    }

    const localOutDir = path.resolve(inOutDir);

    // ensure the dist root exists
    mkdirSync(localOutDir, { recursive: true });
    console.log(`\njson-fs ${meta.version} — writing to: ${localOutDir}\n`);

    // root node can be a single object or an array of root nodes
    if (Array.isArray(inSourceJson)) {
        inSourceJson.forEach((node) => traverse(node, localOutDir));
    } else {
        traverse(inSourceJson, localOutDir);
    }

    console.log("\n✅ done.\n");
};

export { jsonFs };
export default jsonFs;
