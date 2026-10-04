import traverseObject from "./traverseObject/index.js";

const buildRequestBody = (requestBody, { company, collection }) => {
    return requestBody
        .replace("{company}", company)
        .replace("{collectionBody}", collection);
};

const execute = async (connection, xml) => {
    console.log(xml);
    const response = await fetch(connection.url, {
        method: connection.method,
        headers: connection.headers,
        body: xml
    });

    return await response.text();
};

const traverse = async (
    raka,
    relativePath,
    pathToFind,
    context = {}
) => {
    if (relativePath === pathToFind) {
        if (raka?.action === "fetch") {
            const body = buildRequestBody(
                context.request.body,
                {
                    company: context.company,
                    collection: raka.tdl.collection
                }
            );

            return await execute(context.connection, body);
        }

        return raka;
    }

    if (typeof raka === "object" && raka !== null) {
        return await traverseObject(
            raka,
            relativePath,
            pathToFind,
            context
        );
    }

    return undefined;
};

export { traverse };
export default traverse;
