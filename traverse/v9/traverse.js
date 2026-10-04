import traverseObject from "./traverseObject/index.js";

const execute = async (xml) => {
    const response = await fetch("http://localhost:9000", {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: xml
    });

    return await response.text();
};

const traverse = async (raka, relativePath, pathToFind) => {

    if (relativePath === pathToFind) {

        console.log("FOUND:", relativePath);

        if (raka?.action === "fetch") {
            return await execute(raka.body);
        }

        return raka;
    }

    if (typeof raka === "object" && raka !== null) {
        return await traverseObject(
            raka,
            relativePath,
            pathToFind
        );
    }

    return undefined;
};

export { traverse };
export default traverse;