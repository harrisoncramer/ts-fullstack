import { NextFunction, Request, Response } from "express"

export interface RequestWithId extends Request {
  params: {
    id: string
  }
}

export default function (req: RequestWithId, res: Response, next: NextFunction) {
  const id = req.params.id
  if(!id || typeof id !== 'string') {
    res.status(400).send({ error: "Must provide user ID" })
    return
  }
  next()
}
