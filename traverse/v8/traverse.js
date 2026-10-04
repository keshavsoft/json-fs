import traverseObject from "./traverseObject/index.js";
/**
 * Traverse the JSON-to-DOM specJsonification.
 *
 * This is the central dispatcher, intentionally modeled after the clear
 * traversal boundary used by node-json-transformer.
 */
const traverse = (raka, relativePath, pathToFind) => {
    console.log("bbbbbbbbb : ", relativePath, pathToFind);

    if (relativePath === pathToFind) {
        console.log("cccccccccc : ", relativePath, pathToFind);

        return raka;
    };

    if (typeof raka === "object") {
        return traverseObject(raka, relativePath, pathToFind);
    };
};

export { traverse };
export default traverse;