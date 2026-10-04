declare const tally: {
    masters: {
        units: {
            fetch(): Promise<string>;
        };
        stockItems: {
            withBatches(): Promise<string>;
        };
    };
};

export default tally;
