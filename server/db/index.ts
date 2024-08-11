import { User } from 'shared/types'

import users from '@/data/users'

export interface DatabaseType {
  users: User[]
  init(): Promise<void>
}

export class Db implements DatabaseType {
  users: User[]
  constructor () {
    this.users = []
  }

  init (): Promise<void> {
    return new Promise((resolve) => {
      console.log("Connecting to fake DB...")
      setTimeout(() => {
        this.users = users
        resolve()
      }, 500)
    })
  }
}
