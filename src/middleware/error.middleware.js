import { AppError } from '../utils/apiResponse.js';

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      error: err.validationErrors || null
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    res.status(500).json({
      success: false,
      message: 'Something went very wrong!',
    });
  }
};

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === 'SequelizeValidationError') {
      const errors = {};
      err.errors.forEach(e => {
        errors[e.path] = e.message;
      });
      error = new AppError('Validation failed', 400);
      error.validationErrors = errors;
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      error = new AppError('Duplicate field value. Please use another value!', 400);
    }
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
       error = new AppError('JSON parsing error', 400);
    }

    sendErrorProd(error, res);
  }
};

export default errorMiddleware;
