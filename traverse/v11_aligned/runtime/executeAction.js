const buildRequestBody = (template, tdl) => {
    return template
        .replace("{company}", tdl.company)
        .replace("{collectionBody}", tdl.collection);
};

const executeFetch = async ({ definition, request, connection }) => {
    if (!definition?.tdl) {
        throw new Error("Fetch definition is missing 'tdl'.");
    }

    const body = buildRequestBody(request.body, definition.tdl);

    const response = await fetch(connection.url, {
        method: connection.method ?? "POST",
        headers: connection.headers ?? {
            "Content-Type": "text/xml"
        },
        body
    });

    if (!response.ok) {
        throw new Error(
            `Tally request failed: ${response.status} ${response.statusText}`
        );
    }

    return await response.text();
};

const actions = {
    fetch: executeFetch
};

const executeAction = async ({ definition, source }) => {
    const action = definition?.action;

    if (!action) {
        return definition;
    }

    const handler = actions[action];

    if (!handler) {
        throw new Error(`Unknown action: ${action}`);
    }

    return await handler({
        definition,
        request: source.tally.request,
        connection: source.tally.connection
    });
};

export default executeAction;
