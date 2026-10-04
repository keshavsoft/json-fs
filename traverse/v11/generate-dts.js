import fs from "node:fs";
import path from "node:path";

const rootDir = new URL(".", import.meta.url);
const apiFile = new URL("./external-api/api.json", rootDir);
const sourceFile = new URL("./source.json", rootDir);
const outputFile = new URL("./index.d.ts", rootDir);

const apiPaths = JSON.parse(fs.readFileSync(apiFile, "utf8"));
const source = JSON.parse(fs.readFileSync(sourceFile, "utf8"));

const getByPath = (object, pathString) => {
    return pathString.split(".").reduce(
        (current, key) => current?.[key],
        object
    );
};

const tree = {};

for (const apiPath of apiPaths) {
    if (typeof apiPath !== "string" || !apiPath.trim()) {
        throw new Error("Every API path must be a non-empty string.");
    }

    if (getByPath(source, apiPath) === undefined) {
        throw new Error(`API path does not exist in source.json: ${apiPath}`);
    }

    const parts = apiPath.split(".");
    let current = tree;

    for (const part of parts) {
        current[part] ??= {};
        current = current[part];
    }

    current.__endpoint = true;
}

const renderTree = (node, level = 0) => {
    const indent = "    ".repeat(level);
    const childIndent = "    ".repeat(level + 1);
    const lines = ["{"];

    for (const [key, value] of Object.entries(node)) {
        if (key === "__endpoint") continue;

        const isEndpoint = value.__endpoint === true;
        const nestedKeys = Object.keys(value).filter(
            (childKey) => childKey !== "__endpoint"
        );

        if (isEndpoint && nestedKeys.length === 0) {
            lines.push(`${childIndent}${key}: () => Promise<unknown>;`);
            continue;
        }

        lines.push(
            `${childIndent}${key}: ${renderTree(value, level + 1)};`
        );
    }

    lines.push(`${indent}}`);
    return lines.join("\n");
};

const rootName = Object.keys(tree)[0];

if (!rootName) {
    throw new Error("api.json does not contain any public API paths.");
}

const declaration = `declare const ${rootName}: ${renderTree(tree[rootName])};

export default ${rootName};
`;

fs.writeFileSync(outputFile, declaration);

console.log(`Generated ${path.basename(outputFile.pathname)} from external-api/api.json`);
