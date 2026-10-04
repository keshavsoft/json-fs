import source from "../source.json" with { type: "json" };
import traverse from "../traverse.js";
import apiPaths from "./api.json" with { type: "json" };

const createFunction = (path) => async () => {
    return await traverse(source, "", path);
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

    const rootName = paths[0]?.split(".")[0];

    return rootName ? root[rootName] : root;
};

export default createApi(apiPaths);
