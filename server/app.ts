import express, { Request, Response } from "express";
import * as OpenApiValidator from 'express-openapi-validator'
import path from "path"
const __dirname = import.meta.dirname
import urls from '@/urls'

const spec = path.join(__dirname, 'api.yaml');

const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: false }))
app.use(
  OpenApiValidator.middleware({
    apiSpec: spec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get(urls.users.list, (_req: Request, res: Response) => {
  res.status(200).send([
    {
      first_name: "Harry",
      last_name: "Cramer",
    }
  ]);
});

/* Error handler */
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
