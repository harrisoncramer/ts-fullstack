import express, { Request, Response } from "express"

const router = express.Router()

router.get('/api/v1/users', async (req: Request, res: Response) => {
  const db = req.app.get('db')
  const users = await db.getUsers()
  res.status(200).send(users)
})

export default router
