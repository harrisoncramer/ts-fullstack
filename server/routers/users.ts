import { UserControllerType } from "@/db/userController"
import express, { Request, Response } from "express"
import validateUserId, { RequestWithId } from '@/middleware/validateUserId'

const router = express.Router()

const LIMIT = 20
const PAGE = 1

router.get('/api/v1/users', async (req: Request, res: Response) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const page = Number(req.query.page) || PAGE
    const limit = Number(req.query.limit) || LIMIT
    /* This would in actuality be done via a controller rather than directly in the handler
    SELECT field_1, field_2 FROM users
    ORDER BY column_name
    LIMIT 100 OFFSET 100;
    If this is too slow for large datasets, and we want random page access, consider keyset pagination instead.
    */
    const response = await userController.getUsers({ page, limit })
    res.status(200).send(response)
  } catch (err) {
    handleError(err, res)
  }
})

router.get('/api/v1/users/:id', validateUserId, async (req: RequestWithId, res: Response) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const id = req.params.id
    const user = await userController.getUserById({ id })
    if(!user) {
      res.status(400)
      return handleError(new Error("Could not find user"), res)
    }
    res.status(200).send(user)
  } catch (err) {
    handleError(err, res)
  }
})

router.post('/api/v1/users', async (req: Request, res: Response) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const user = await userController.addUser(req.body)
    if(!user) {
      res.status(400)
      return handleError(new Error("Could not create user"), res)
    }
    res.status(200).send(user)
  } catch (err) {
    handleError(err, res)
  }
})

router.delete('/api/v1/users/:id', validateUserId, async (req: RequestWithId, res: Response) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const id = req.params.id
    const user = await userController.getUserById({ id })
    if(!user) {
      res.status(400)
      return handleError(new Error("Could not find user"), res)
    }
    res.status(200).send(user)
  } catch (err) {
    handleError(err, res.status(400))
  }
})

function handleError (err: any, res: Response) {
  const e = err as Error
  if(res.statusCode) {
    res.json({ error: e.message })
  } else {
    res.status(500).json({ error: e.message })
  }
}

export default router
