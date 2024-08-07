import { Request, Response, NextFunction } from "express"

export default function (req: Request, _: Response, next: NextFunction) {
  next()
}
