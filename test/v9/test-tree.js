import source from "./source.json" with { type: "json" };

const getByPath = (source, path) => {
    return path
        .split(".")
        .reduce((current, key) => current?.[key], source);
};

const execute = ({ path, args }) => {
    const definition = getByPath(
        source.tally,
        path
    );

    let body = definition.body;

    body = body.replace(
        "{COMPANY}",
        args.company
    );

    console.log("PATH:", path);
    console.log("BODY:");
    console.log(body);

    return body;
};

const buildTree = (node, path = "") => {
    const result = {};

    for (const [key, value] of Object.entries(node)) {
        const currentPath = path
            ? `${path}.${key}`
            : key;

        if (value?.body) {
            result[key] = (args) =>
                execute({
                    path: currentPath,
                    args
                });
        } else {
            result[key] = buildTree(
                value,
                currentPath
            );
        }
    }

    return result;
};

const tally = buildTree(source.tally);

// ---- OUTSIDE NPM USER ----

const result = tally.masters.units.all({
    company: "My Company"
});

console.log("RETURNED:");
console.log(result);