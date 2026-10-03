import path from "path";
import { mkdirSync, writeFileSync } from "fs";
import { traverseArray } from "../traverseArray/index.js";

/**
 * traverseObject (v1)
 *
 * Handles a single JSON node. Two cases:
 *   "type": "folder"  →  mkdir + recurse into children
 *   "type": "file"    →  create empty file
 *
 * inNode shape expected:
 *   { name: string, type: "folder" | "file", children?: [...] }
 */
const traverseObject = (inNode, inOutPath) => {
    const localName = inNode?.name;
    const localType = inNode?.type;
    const localChildren = inNode?.children;

    if (!localName || !localType) return;

    const localFullPath = path.join(inOutPath, localName);

    if (localType === "folder") {
        mkdirSync(localFullPath, { recursive: true });
        console.log(`  📁 created folder: ${localFullPath}`);

        if (Array.isArray(localChildren) && localChildren.length > 0) {
            traverseArray(localChildren, localFullPath);
        }
        return;
    }

    if (localType === "file") {
        writeFileSync(localFullPath, "", "utf8");
        console.log(`  📄 created file:   ${localFullPath}`);
        return;
    }

    console.warn(`  ⚠️  unknown type "${localType}" for node "${localName}" — skipped`);
};

export default traverseObject;
