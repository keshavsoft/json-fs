const getByPath = (source, path) => {
    const parts = path.split(".");

    let current = source;

    for (const part of parts) {
        if (current === undefined || current === null) {
            return undefined;
        }

        current = current[part];
    }

    return current;
};

export default getByPath;