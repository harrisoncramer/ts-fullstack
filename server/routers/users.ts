import express, { Request, Response } from "express"
import urls from '@/urls'
import { GetApiV1UsersResponse } from '@/api'

const router = express.Router()

router.get(urls.users.list, (_req: Request, res: Response) => {
  const data: GetApiV1UsersResponse = [{ first_name: "Harry", last_name: "Cramer" }]
  res.status(200).send(data);
});

export default router
