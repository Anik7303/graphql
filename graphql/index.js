exports.schema = require('./schema');
exports.resolvers = require('./resolvers');

exports.customErrorFunction = (err) => {
    if (!err.originalError || !err.originalError.data) {
        return err;
    }

    const { data, code } = err.originalError;
    const error = { data, code };
    return error;
};
