const execute = async (action, args) => {
    console.log("ACTION:", action);
    console.log("ARGS:", args);

    return {
        action,
        args
    };
};

export default execute;
