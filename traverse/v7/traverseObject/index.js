import traverse from "../traverse.js";

const traverseObject = (specJson, relativePath, dataJson) => {
    for (const [key, value] of Object.entries(specJson)) {
        if (typeof value === "object") {
            if (relativePath === undefined) {
                return traverse(value, key, dataJson);
            } else {
                if (relativePath === "") {
                    return traverse(value, key, dataJson);
                } else {
                    return traverse(value, `${relativePath}.${key}`, dataJson);
                };
            };
        };
    };
};

export default traverseObject;