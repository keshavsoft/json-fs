const resolveContent = ({ inRelativePath, inName, inInstructionJson } = {}) => {
    if (!inInstructionJson || typeof inInstructionJson !== "object") {
        return "";
    }

    const localNormalizedPath = inRelativePath ? inRelativePath.replace(/\\/g, "/") : "";

    let localContent = "";

    if (localNormalizedPath && Object.prototype.hasOwnProperty.call(inInstructionJson, localNormalizedPath)) {
        localContent = inInstructionJson[localNormalizedPath];
    } else if (inName && Object.prototype.hasOwnProperty.call(inInstructionJson, inName)) {
        localContent = inInstructionJson[inName];
    }

    if (typeof localContent === "function") {
        return localContent({ inRelativePath: localNormalizedPath, inName });
    }

    if (typeof localContent === "object" && localContent !== null) {
        return JSON.stringify(localContent, null, 2);
    }

    return localContent ?? "";
};

export default resolveContent;
