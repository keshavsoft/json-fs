declare const tally: {
    masters: {
        units: {
            fetch: () => Promise<unknown>;
        };
        stockItems: {
            withBatches: () => Promise<unknown>;
        };
    };
};

export default tally;
