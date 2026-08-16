import { AppError } from '../utils/apiResponse.js';

const notFoundMiddleware = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

export default notFoundMiddleware;
