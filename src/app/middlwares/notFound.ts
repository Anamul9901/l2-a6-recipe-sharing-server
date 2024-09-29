import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

// Middleware for handling 404 Not Found
const notFound = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Not Found',
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

export default notFound;
