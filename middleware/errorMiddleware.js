function errHandler(err, req, res, next) {
    console.error(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    console.log('Error middleware is called');
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
}

module.exports = errHandler;