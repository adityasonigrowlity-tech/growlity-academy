/**
 * @desc    Uniform API response class
 */
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }

    /**
     * @static
     * @desc    Send a success response
     */
    static success(res, data, message = "Success", statusCode = 200) {
        return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
    }

    /**
     * @static
     * @desc    Send an error response
     */
    static error(res, message = "Error", statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message
        });
    }
}

module.exports = ApiResponse;
