import { Request, Response, NextFunction } from "express"

/* Error handler */
interface CustomError extends Error {
  status?: number;
  errors?: any;
}

export default (function () {
  return function (err: CustomError, _req: Request, res: Response, _next: NextFunction) { res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  }
})()
