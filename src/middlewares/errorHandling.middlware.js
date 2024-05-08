const errorHandler = (err, req, res, next) => {
    console.log('Error: ', err);
    res.status(err.statusCode || 500).json({
        message: err.message,
        error: true,
    });
};

module.exports = errorHandler;
