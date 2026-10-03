import path from "path";
import { mkdirSync, writeFileSync } from "fs";
import { traverseArray } from "../traverseArray/index.js";

/**
 * traverseObject (v2)
 *
 * Handles a single JSON node. Two cases:
 *   "type": "folder"  →  mkdir + recurse into children
 *   "type": "file"    →  create file with content from instruction JSON (or empty fallback)
 *
 * Parameters passed:
 *   { inNode, inOutPath, inRelativePath, inInstructionJson }
 */
const traverseObject = ({ inNode, inOutPath, inRelativePath = "", inInstructionJson = {} } = {}) => {
    const localName = inNode?.name;
    const localType = inNode?.type;
    const localChildren = inNode?.children;

    if (!localName || !localType) return;

    const localFullPath = path.join(inOutPath, localName);
    const localCurrentRelativePath = inRelativePath ? `${inRelativePath}/${localName}` : localName;

    if (localType === "folder") {
        mkdirSync(localFullPath, { recursive: true });
        console.log(`  📁 created folder: ${localFullPath}`);

        if (Array.isArray(localChildren) && localChildren.length > 0) {
            traverseArray({
                inItems: localChildren,
                inOutPath: localFullPath,
                inRelativePath: localCurrentRelativePath,
                inInstructionJson
            });
        }
        return;
    }

    if (localType === "file") {
        // Lookup instruction using normalized relative path or file name
        let localFileContent = "";

        if (inInstructionJson && typeof inInstructionJson === "object") {
            const normalizedRelPath = localCurrentRelativePath.replace(/\\/g, "/");

            if (Object.prototype.hasOwnProperty.call(inInstructionJson, normalizedRelPath)) {
                localFileContent = inInstructionJson[normalizedRelPath];
            } else if (Object.prototype.hasOwnProperty.call(inInstructionJson, localName)) {
                localFileContent = inInstructionJson[localName];
            }
        }

        // If content is an object/array, format as JSON string
        if (typeof localFileContent === "object" && localFileContent !== null) {
            localFileContent = JSON.stringify(localFileContent, null, 2);
        }

        writeFileSync(localFullPath, localFileContent ?? "", "utf8");
        const hasContent = Boolean(localFileContent);
        console.log(`  📄 created file:   ${localFullPath} ${hasContent ? "(with content)" : "(empty)"}`);
        return;
    }

    console.warn(`  ⚠️  unknown type "${localType}" for node "${localName}" — skipped`);
};

export default traverseObject;
