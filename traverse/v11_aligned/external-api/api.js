import source from "../source.json" with { type: "json" };
import apiPaths from "./api.json" with { type: "json" };
import resolve from "../runtime/resolve.js";

const createFunction = (path) => {
    return async (...args) => {
        if (args.length > 0) {
            throw new Error(
                `${path}() does not accept arguments yet.`
            );
        }

        return await resolve(source, path);
    };
};

const createApi = (paths) => {
    const root = {};

    for (const path of paths) {
        const parts = path.split(".");

        if (parts[0] === "tally") {
            parts.shift();
        }

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
