import source from "../source.json" with { type: "json" };
import traverse from "../traverse.js";
import apiPaths from "./api.json" with { type: "json" };

const createFunction = (path, company) => async (path, company) => {

    if (typeof company !== "string" || !company.trim()) {
        throw new TypeError("Company name is required.");
    }

    return await traverse(source, "", path, {
        company: company.trim(),
        connection: source.tally.connection,
        request: source.tally.request
    });
};

const createApi = (company) => {
    const paths = apiPaths;

    const root = {};

    for (const path of paths) {
        const parts = path.split(".");
        let current = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;

            if (isLast) {
                current[part] = createFunction(path, company);
                return;
            }

            current[part] ??= {};
            current = current[part];
        });
    }

    const rootName = paths[0]?.split(".")[0];

    return rootName ? root[rootName] : root;
};

export default createApi();
