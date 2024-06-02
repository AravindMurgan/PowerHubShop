const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    // pass error to error handler
    next(error);
}

const errorHandler = (err, req, res, next) => {
    // set status code to 200 if it's 500
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message= err.message;

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound, errorHandler};