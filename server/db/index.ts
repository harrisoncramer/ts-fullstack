type User = {
  first_name: string,
  last_name: string,
}

export default class Db {
  constructor () {

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
    return [
      {
        first_name: "Harry",
        last_name: "Cramer",
      }
    ]
  }
}
