export type User = {
  first_name: string,
  last_name: string,
  id: number
}
const INITIAL_USERS: User[] = [
  {
    first_name: "Harry",
    last_name: "Cramer",
    id: 1,
  },
  {
    first_name: "Sam",
    last_name: "McGee",
    id: 2,
  }
]

export default class Db {
  users: User[]
  constructor () {
    this.users = INITIAL_USERS
  }

  init (): Promise<void> {
    return new Promise((resolve) => {
      console.log("Connecting to fake DB...")
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  async getUsers (): Promise<User[]> {
    return this.users
  }

  async addUser ({ firstName, lastName }: { firstName: string, lastName: string }): Promise<User> {
    const nextId = (this.users.at(-1)?.id || 0) + 1
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      id: nextId,
    }
    this.users.push(newUser)
    return newUser
  }

  async removeUser ({ id }: { id: number }) {
    const i = this.users.findIndex((user) => user.id === id)
    if(i === -1) {
      throw new Error("Could not find user")
    }
    const user = this.users[i]
    this.users.splice(i, 1)
    return user
  }
}
