# External API Layer

A small public API projection over the internal Tally source JSON.

The public API is defined by `external-api/api.json` as paths such as:

- `tally.masters.units.fetch`
- `tally.masters.stockItems.withBatches`

The runtime resolves the implementation from the internal source JSON. The public API does not expose internal `body`, `action`, or `tdl` details.
