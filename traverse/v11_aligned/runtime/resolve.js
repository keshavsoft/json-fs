import getByPath from "./getByPath.js";
import executeAction from "./executeAction.js";

const resolve = async (source, path) => {
    const definition = await getByPath(source, path);

    if (definition === undefined) {
        throw new Error(`API path not found: ${path}`);
    }

    return await executeAction({
        definition,
        source
    });
};

export default resolve;
