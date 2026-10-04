# Tally Public API

`external-api/api.json` is the public API definition.

The runtime API is generated from those public paths, while `source.json` remains the internal source of truth for Tally connection, request, TDL, and action details.

## Public API

```js
import tally from "./index.js";

const units = await tally.masters.units.fetch();
const stockItems = await tally.masters.stockItems.withBatches();
```

## Generate IntelliSense

Whenever `external-api/api.json` changes, regenerate the static TypeScript declaration file:

```bash
node generate-dts.js
```

This validates every public path against `source.json` and writes `index.d.ts`.
