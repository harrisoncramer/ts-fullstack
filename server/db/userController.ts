import users from '@/data/users'
import { User, Pagination } from '@shared/types'
import { DatabaseType } from '@/db'
import crypto from "crypto"

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
  users: User[]
  db: DatabaseType
  constructor (db: DatabaseType) {
    this.users = users
    this.db = db
  }

  /* Mocking the pagination/slicing aspect of this...
  If this were a real database this would be handled differently! */
  async getUsers ({ page, limit }: Pagination): Promise<{ users: User[], meta: Meta }> {
    const results = this.users.slice((page - 1) * limit, page * limit)
    return { users: results, meta: { hasMore: (page * limit) < users.length } }
  }

  async getUserById ({ id }: { id: string }): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  async addUser (newUser: Omit<User, 'id'>): Promise<User> {
    const datum = {
      ...newUser,
      id: crypto.randomUUID(),
    }
    this.users.push(datum)
    return datum
  }

  async removeUser ({ id }: { id: string }) {
    const i = this.users.findIndex((user) => user.id === id)
    if(i === -1) {
      throw new Error("Could not find user")
    }
    const user = this.users[i]
    this.users.splice(i, 1)
    return user
  }
}
