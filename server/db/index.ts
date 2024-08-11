import users from '@/data/users'
import { User } from '@shared/types'

export interface DatabaseType {
  init(): Promise<void>
}

export class Db implements DatabaseType {
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
}
