import traverse from "../traverse.js";

const traverseObject = async (
    specJson,
    relativePath,
    dataJson
) => {

    for (const [key, value] of Object.entries(specJson)) {

        if (typeof value === "object" && value !== null) {

            const nextPath = relativePath
                ? `${relativePath}.${key}`
                : key;

            const result = await traverse(
                value,
                nextPath,
                dataJson
            );

            if (result !== undefined) {
                return result;
            }
        }
    }

    return undefined;
};

export default traverseObject;