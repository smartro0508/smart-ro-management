const responseMiddleware = (req, res, next) => {
  res.success = (data, message = 'Success', statusCode = 200) => {
    const payload = {
      success: true,
      message
    };
    if (data !== undefined) {
      payload.data = data;
    }
    return res.status(statusCode).json(payload);
  };
  next();
};

export default responseMiddleware;
