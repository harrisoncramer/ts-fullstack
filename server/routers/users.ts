import express, { Request, Response } from "express"

const router = express.Router()

router.get('/api/v1/users', async (req: Request, res: Response) => {
  const db = req.app.get('db')
  try {
    const users = await db.getUsers() // This would in actuality be done via a controller rather than directly in the handler
    res.status(200).send(users)
    return
  } catch (err) {
    const e = err as Error
    res.status(500).json({ error: e.message })
  }
})

router.post('/api/v1/users', async (req: Request, res: Response) => {
  const db = req.app.get('db')
  const users = await db.addUser(req.body)
  res.status(200).send(users)
})

export default router
