# Tally Public API

The public API is intentionally small and tree-shaped:

```js
import tally from "./index.js";

const units = await tally.masters.units.fetch();

const stockItems =
    await tally.masters.stockItems.withBatches();
```

## Architecture

```text
source.json
    |
    |-- Tally connection
    |-- request template
    |-- TDL definitions
    |
    v
public api paths (external-api/api.json)
    |
    v
tally.masters.units.fetch()
    |
    v
runtime/resolve.js
    |
    v
runtime/getByPath.js
    |
    v
runtime/executeAction.js
    |
    v
Tally HTTP :9000
```

`api.json` defines what is public.

`source.json` contains the actual Tally implementation.

The public API never exposes `action`, `tdl`, request templates, or connection details.

## Run

Make sure Tally is listening on:

```text
http://localhost:9000
```

Then:

```bash
npm test
```

or:

```bash
npm run test:api
```

Change `source.json` to change the Tally company or collection definitions.

## Add another public endpoint

Add the implementation to `source.json`, then add its public path to `external-api/api.json`.

Example:

```json
"ledger": {
    "all": {
        "action": "fetch",
        "tdl": {
            "company": "mani9",
            "collection": "<TYPE>Ledger</TYPE><FETCH>$$Alias:Name</FETCH>"
        }
    }
}
```

Then expose:

```json
"tally.masters.ledger.all"
```

The runtime code does not need another hard-coded Tally path.
