import app from "@/app"
import Db from "@/db"

const PORT = process.env.PORT || 3001

const db = new Db()
await db.init()

app.set('db', db)
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}.`)
})
