import express, { Request, Response } from "express"
import { GetApiV1UsersByUserIdResponse, GetApiV1UsersResponse } from '@/api'
import urls from '@/urls'

const router = express.Router()

const allUsers = [
  {
    first_name: "Harry",
    last_name: "Cramer",
    id: 0,
  },
  {
    first_name: "Sam",
    last_name: "McGee",
    id: 1,
  },
  {
    first_name: "Brad",
    last_name: "Bentley",
    id: 2,
  },
]

router.get(urls.users.get, (_req: Request, res: Response) => {
  const data: GetApiV1UsersResponse = allUsers
  res.status(200).send(data)
})

router.get(urls.users.getById, (req: Request, res: Response) => {
  const { id } = req.params
  const user: GetApiV1UsersByUserIdResponse | undefined = allUsers.find((user) => user.id === Number(id))
  if(!user) {
    res.status(404).send("User not found")
    return
  }

  res.status(200).send(user)
})

export default router
