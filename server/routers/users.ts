import express, { NextFunction, Request, Response } from "express"
import urls from 'shared/urls'

import { UserControllerType } from "@/db/userController"
import validateUserId, { RequestWithId } from '@/middleware/validateUserId'

const router = express.Router()

export const DEFAULT_LIMIT = 20
export const DEFAULT_PAGE = 1

router.get(urls.users.base, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const page = Number(req.query.page) || DEFAULT_PAGE
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    /* This would in actuality be done via a controller rather than directly in the handler
    SELECT field_1, field_2 FROM users
    ORDER BY column_name
    LIMIT 100 OFFSET 100;
    If this is too slow for large datasets, and we want random page access, consider keyset pagination instead.
    */
    const response = await userController.getUsers({ page, limit })
    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
})

router.get(urls.users.byId, validateUserId, async (req: RequestWithId, res: Response, next: NextFunction) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const id = req.params.id
    const user = await userController.getUserById({ id })
    if(!user) {
      res.status(404).send({ error: "Could not find user" })
      return
    }
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})

router.post(urls.users.base, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const user = await userController.addUser(req.body)
    if(!user) {
      res.status(400).send({ error: "Could not create user" })
      return
    }
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})

router.delete(urls.users.byId, validateUserId, async (req: RequestWithId, res: Response, next: NextFunction) => {
  try {
    const userController: UserControllerType = req.app.get('userController')
    const id = req.params.id
    const user = await userController.getUserById({ id })
    if(!user) {
      res.status(404).send({ error: "Could not find user" })
      return
    }
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})

export default router
