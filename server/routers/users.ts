import express, { Request, Response } from "express"

const router = express.Router()

const LIMIT = 20
const PAGE = 1

router.get('/api/v1/users', async (req: Request, res: Response) => {
  const db = req.app.get('db')
  const page = req.query.page || PAGE
  const limit = req.query.limit || LIMIT
  try {
    /* This would in actuality be done via a controller rather than directly in the handler
    SELECT field_1, field_2 FROM users
    ORDER BY column_name
    LIMIT 100 OFFSET 100;
    If this is too slow for large datasets, and we want random page access, consider keyset pagination instead.
    */
    const users = await db.getUsers({ page, limit })
    res.status(200).send(users)
  } catch (err) {
    handleError(err, res)
  }
})

router.get('/api/v1/users/:id', async (req: Request, res: Response) => {
  const db = req.app.get('db')
  const id = req.params.id
  try {
    const users = await db.getUserById({ id })
    res.status(200).send(users)
  } catch (err) {
    handleError(err, res)
  }
})

router.post('/api/v1/users', async (req: Request, res: Response) => {
  try {
    const db = req.app.get('db')
    const users = await db.addUser(req.body)
    res.status(200).send(users)
  } catch (err) {
    handleError(err, res)
  }
})

router.delete('/api/v1/users/:id', async (req: Request, res: Response) => {
  try {
    const db = req.app.get('db')
    const id = req.params.id
    const users = await db.removeUser({ id })
    res.status(200).send(users)
  } catch (err) {
    handleError(err, res)
  }
})

function handleError (err: any, res: Response) {
  const e = err as Error
  res.status(500).json({ error: e.message })
}

export default router
