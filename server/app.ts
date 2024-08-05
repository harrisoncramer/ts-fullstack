import express, { Request, Response } from "express"
import urls from '@/urls'
import { GetApiV1UsersResponse } from '@/api'
import openapi from "@/middleware/openapi"
import errors from "@/middleware/errors"

const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: false }))
app.use(openapi)
app.use(errors)
app.get(urls.users.list, (_req: Request, res: Response) => {
  const data: GetApiV1UsersResponse = [{ first_name: "Harry", last_name: "Cramer" }]
  res.status(200).send(data);
});


export default app;
