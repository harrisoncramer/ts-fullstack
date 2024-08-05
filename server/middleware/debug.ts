import { Request, Response, NextFunction } from "express";

export default function (req: Request, _: Response, next: NextFunction) {
  console.log("\n\n");
  console.log("REQUEST URL: ", req.url);
  console.log("REQUEST METHOD: ", req.method);
  console.log("REQUEST BODY:", req.body);
  console.log("\n\n");
  next()
}
