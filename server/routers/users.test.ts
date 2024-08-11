import express from 'express'
import users from 'shared/mocks/users'
import { User } from 'shared/types'
import urls from 'shared/urls'
import request from 'supertest'
import { describe, expect, test } from 'vitest'

import { DatabaseType } from '@/db'
import UserController from '@/db/userController'
import errorHandler from '@/middleware/errors'
import usersRouter from '@/routers/users'

class MockDb implements DatabaseType {
  users: User[]
  constructor () {
    this.users = []
  }
  async init () {
    this.users = users
  }
}

const mockDb = new MockDb()
await mockDb.init()
const app = express()

/* We can now override individual methods */
class MockUserController extends UserController {}
function setup (ctrl?: MockUserController) {
  const userController = ctrl ? ctrl : new MockUserController(mockDb)
  app.set('userController', userController)
  app.use(usersRouter)
  app.use(errorHandler)
  return app
}

describe(`GET ${urls.users.base}`, () => {
  test('Should respond with some users', async () => {
    const app = setup()
    const response = await request(app).get(urls.users.base)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.users).toEqual(users)
  })

  test('Should handle bad DB call', async () => {
    const userController = new MockUserController(mockDb)
    const errMsg = "Ahhhh"
    userController.getUsers = async function (_) {
      throw new Error(errMsg)
    }

    const app = setup(userController)
    const response = await request(app).get(urls.users.base)
    expect(response.status).toBe(500)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual({ error: errMsg })
  })

  test('Should be able to specify another page', async () => {
    const app = setup()
    const response = await request(app).get(`${urls.users.base}?page=2&limit=1`)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.users).toEqual([users[1]]) // Skip the first user
  })

  test('Should handle bad query parameters', async () => {
    const app = setup()
    const response = await request(app).get(`${urls.users.base}?page=foo&limit=blah`)
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.users).toEqual(users)
  })
})
