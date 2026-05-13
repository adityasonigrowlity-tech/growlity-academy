/**
 * @desc    Wrapper to catch async errors and pass them to the global error handler
 * @param   {Function} fn - Async middleware function
 * @returns {Function} - Wrapped function
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
