import app from "@/app"
import { Db } from "@/db"
import UserController from "@/db/userController"

const PORT = process.env.PORT || 3001

const db = new Db()
await db.init()
const userController = new UserController(db)

app.set('userController', userController)

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}.`)
})
