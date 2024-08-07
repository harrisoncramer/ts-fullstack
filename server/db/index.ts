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
}
