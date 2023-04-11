const { getErrorMessage } = require('../utils/errorHelpers');

exports.errorHandler = (err, req, res, next) => {
    const status = err.status || 404;

    res.status(status).json({ error: getErrorMessage(err) });
}
