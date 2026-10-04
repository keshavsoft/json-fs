import source from "../source.json" with { type: "json" };
import traverse from "../traverse.js";
import apiPaths from "./api.json" with { type: "json" };

const createFunction = (path) => {
    return async (...args) => {
        return await traverse(source, "", path, ...args);
    };
};

const createApi = (paths) => {
    const root = {};

    for (const path of paths) {
        const parts = path.split(".");
        let current = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;

            if (isLast) {
                current[part] = createFunction(path);
                return;
            }

            current[part] ??= {};
            current = current[part];
        });
    }

    return root;
};

export default createApi(apiPaths);
