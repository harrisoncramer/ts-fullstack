import express, { Request, Response } from "express";
import debug from "./middleware/debug";

const app = express()
app.use(express.json())
if(process.env.DEBUG) app.use(debug)

app.get('/api/v1/users', (_req: Request, res: Response) => {
  res.status(200).send([
    {
      first_name: "Harry",
      last_name: "Cramer",
    }
  ]);
});

export default app;
