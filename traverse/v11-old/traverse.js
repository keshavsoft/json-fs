import traverseObject from "./traverseObject/index.js";

const body1 = "<ENVELOPE>\n<HEADER>\n<VERSION>1</VERSION>\n<TALLYREQUEST>Export</TALLYREQUEST>\n<TYPE>Collection</TYPE>\n<ID>TDLID</ID>\n</HEADER>\n<BODY>\n<DESC>\n<STATICVARIABLES>\n<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>\n<SVCURRENTCOMPANY>{COMPANY}</SVCURRENTCOMPANY>\n</STATICVARIABLES>\n<TDL>\n<TDLMESSAGE>\n<COLLECTION NAME=\"TDLID\">\n<TYPE>Unit</TYPE>\n<FETCH>$$Alias:Name</FETCH>\n</COLLECTION>\n</TDLMESSAGE>\n</TDL>\n</DESC>\n</BODY>\n</ENVELOPE>";
const body = "<ENVELOPE>\n<HEADER>\n<VERSION>1</VERSION>\n<TALLYREQUEST>Export</TALLYREQUEST>\n<TYPE>Collection</TYPE>\n<ID>TDLID</ID>\n</HEADER>\n<BODY>\n<DESC>\n<STATICVARIABLES>\n<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>\n<SVCURRENTCOMPANY>{company}</SVCURRENTCOMPANY>\n</STATICVARIABLES>\n<TDL>\n<TDLMESSAGE>\n<COLLECTION NAME=\"TDLID\">\n{collectionBody}</COLLECTION>\n</TDLMESSAGE>\n</TDL>\n</DESC>\n</BODY>\n</ENVELOPE>";

const execute = async (xml) => {
    // console.log("xml:", xml);

    let response = await fetch("http://localhost:9000", {
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
        if (raka?.action === "fetch") {
            let newBody = body.replace("{company}", raka.tdl.company);
            newBody = newBody.replace("{collectionBody}", raka.tdl.collection);
            console.log("body:", raka.tdl);
            return await execute(newBody);
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