import execute from "./execute.js";

const buildTree = (node) => {
    if (!node || typeof node !== "object" || Array.isArray(node)) {
        return node;
    }

    const result = {};

    for (const [key, value] of Object.entries(node)) {
        if (value?.action) {
            result[key] = (...args) => execute(value.action, args);
        } else if (value?.type === "file") {
            const action = value.name?.replace(/\.[^.]+$/, "") ?? key;
            result[key] = (...args) => execute(action, args);
        } else if (value?.type === "folder") {
            result[key] = buildTree(value.children ?? {});
        } else {
            result[key] = buildTree(value);
        };
    }

    return result;
};

export default buildTree;
