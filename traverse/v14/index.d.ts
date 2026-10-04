declare const tally: {
    masters: {
        units: {
            fetch: (company: string) => Promise<unknown>;
        };
        stockItems: {
            withBatches: (company: string) => Promise<unknown>;
        };
        ledgers: {
            withGstDetails: (company: string) => Promise<unknown>;
        };
    };
};

export default tally;
