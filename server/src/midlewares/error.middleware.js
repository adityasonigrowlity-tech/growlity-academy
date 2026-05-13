const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error for development
    console.error(`[Error] ${err.message}`);
    if (process.env.NODE_ENV !== 'production' && err.stack) {
        console.error(err.stack);
    }

    // Prisma Specific Errors
    if (err.code === 'P2002') {
        const field = err.meta?.target || 'field';
        error.message = `Duplicate value entered for ${field}`;
        error.statusCode = 400;
    }

    if (err.code === 'P2025') {
        error.message = 'Record not found';
        error.statusCode = 404;
    }

    // Prisma Validation/UUID Errors
    if (err.message && err.message.includes('Invalid value for argument')) {
        error.message = 'Invalid data provided (e.g., incorrect ID format)';
        error.statusCode = 400;
    }

    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors).map(val => val.message);
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
