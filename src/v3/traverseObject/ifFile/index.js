import path from "path";
import { writeFileSync } from "fs";
import resolveContent from "./resolveContent.js";

const ifFile = ({ inNode, inOutPath, inRelativePath, inInstructionJson } = {}) => {
    const localName = inNode?.name;
    const localFullPath = path.join(inOutPath, localName);
    const localCurrentRelativePath = inRelativePath ? `${inRelativePath}/${localName}` : localName;

    const localFileContent = resolveContent({
        inRelativePath: localCurrentRelativePath,
        inName: localName,
        inInstructionJson
    });

    writeFileSync(localFullPath, localFileContent, "utf8");
    const hasContent = Boolean(localFileContent);
    console.log(`  📄 created file:   ${localFullPath} ${hasContent ? "(with content)" : "(empty)"}`);
};

export default ifFile;
