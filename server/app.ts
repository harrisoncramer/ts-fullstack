import express, { Request, Response } from "express";

const app = express()
app.use(express.json())

app.get('/api/v1/users', (_req: Request, res: Response) => {
  res.status(200).send([
    {
      first_name: "Harry",
      last_name: "Cramer",
    }
  ]);
});

export default app;
