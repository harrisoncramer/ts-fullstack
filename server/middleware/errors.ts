import { NextFunction, Request, Response } from "express"

/* Error handler */
interface CustomError extends Error {
  status?: number;
  errors?: any;
}

export default function (err: CustomError, _req: Request, res: Response, _next: NextFunction) {
  res.status(err.status || 500).json({ message: err.message, errors: err.errors })
}
