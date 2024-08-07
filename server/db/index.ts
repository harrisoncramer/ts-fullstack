type User = {
  first_name: string,
  last_name: string,
}

export default class db {
  constructor () {

  }

  init (): Promise<void> {
    return new Promise((resolve) => {
      console.log("Connecting to fake DB...")
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  getUsers (): User[] {
    return [
      {
        first_name: "Harry",
        last_name: "Cramer",
      }
    ]
  }
}
