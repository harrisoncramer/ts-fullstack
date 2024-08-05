import express, { Request, Response, NextFunction } from "express"
import * as OpenApiValidator from 'express-openapi-validator'
import path from "path"
const __dirname = import.meta.dirname
import urls from '@/urls'
import { GetApiV1UsersResponse } from '@/api'

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

/* Error handler */
app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.get(urls.users.list, (_req: Request, res: Response) => {
  const data: GetApiV1UsersResponse = [{ first_name: "Harry", last_name: "Cramer" }]
  res.status(200).send(data);
});



interface CustomError extends Error {
  status?: number;
  errors?: any;
}


export default app;
