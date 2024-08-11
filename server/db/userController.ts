import crypto from "crypto"
import { Pagination, User } from 'shared/types'

import users from '@/data/users'
import { DatabaseType } from '@/db'

type Meta = {
  hasMore: boolean
}

export interface UserControllerType {
  getUsers(pagination: Pagination): Promise<{users: User[], meta: Meta}>
  getUserById({ id }: { id: string }): Promise<User | undefined>
  addUser(newUser: Omit<User, 'id'>): Promise<User | undefined>
  removeUser({ id }: { id: string }): Promise<User | undefined>
}

export default class UserController implements UserControllerType {
  db: DatabaseType
  constructor (db: DatabaseType) {
    this.db = db
  }

  /* Mocking the pagination/slicing aspect of this...
  If this were a real database this would be handled differently! */
  async getUsers ({ page, limit }: Pagination): Promise<{ users: User[], meta: Meta }> {
    const results = this.db.users.slice((page - 1) * limit, page * limit)
    return { users: results, meta: { hasMore: (page * limit) < users.length } }
  }

  async getUserById ({ id }: { id: string }): Promise<User | undefined> {
    return this.db.users.find((user) => user.id === id)
  }

  async addUser (newUser: Omit<User, 'id'>): Promise<User> {
    const datum = {
      ...newUser,
      id: crypto.randomUUID(),
    }
    this.db.users.push(datum)
    return datum
  }

  async removeUser ({ id }: { id: string }) {
    const i = this.db.users.findIndex((user) => user.id === id)
    if(i === -1) {
      throw new Error("Could not find user")
    }
    const user = this.db.users[i]
    this.db.users.splice(i, 1)
    return user
  }
}
