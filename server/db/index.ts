import users, { User } from '@/data/users'
import crypto from "crypto"

type Pagination = {
  page: number,
  limit: number,
}

export default class Db {
  users: User[]
  constructor () {
    this.users = users
  }

  init (): Promise<void> {
    return new Promise((resolve) => {
      console.log("Connecting to fake DB...")
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  /* Mocking the pagination/slicing aspect of this...
  If this were a real database this would be handled differently! */
  async getUsers ({ page, limit }: Pagination): Promise<{ users: User[], meta: { hasMore: boolean } }> {
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
