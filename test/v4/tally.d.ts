declare const tally: {
    masters: {
        units: {
            all(options?: {
                from?: string;
                to?: string;
            }): Promise<any>;
        };
    };
};

export default tally;