const isObject = (value) =>
    value !== null && typeof value === "object";

const getByPath = async (source, path) => {
    const parts = path.split(".").filter(Boolean);

    let current = source;

    for (const part of parts) {
        if (!isObject(current) || !(part in current)) {
            return undefined;
        }

        current = current[part];
    }

    return current;
};

export default getByPath;
