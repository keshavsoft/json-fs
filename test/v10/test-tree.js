import source from "./source.json" with { type: "json" };

const getByPath = (source, path) => {
    return path
        .split(".")
        .reduce((current, key) => current?.[key], source);
};

const execute = ({ path, args }) => {
    const definition = getByPath(source.tally, path);

    if (definition?.action === "fetch") {
        return fetch("http://localhost:9000", {
            method: "POST",
            headers: {
                "Content-Type": "application/xml"
            },
            body: args.body
        }).then(response => response.text());
    }

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

        if (value?.body || value?.action) {
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

// ---- TEST ----

const xml = tally.masters.units.all({
    company: "My Company"
});

console.log("XML:", xml);

const result = await tally.masters.units.fetch({
    body: xml
});

console.log("TALLY RESPONSE:");
console.log(result);