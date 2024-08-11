import { NextFunction, Request, Response } from "express"

export default function errorHandler (err: any, _req: Request, res: Response, _next: NextFunction) {
  const e = err as Error
  res.status(500).json({ error: e.message })
}
