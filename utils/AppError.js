class AppError extends Error {
    constructor(statusCode, message, errors){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.errors = errors;
    }
}

module.exports = AppError;