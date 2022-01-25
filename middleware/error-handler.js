import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong, Try Again Later',
  };
  res.status(defaultError.statusCode).json({ msg: err });
};

export default errorHandlerMiddleware;
