import app from "@/app"
import db from "@/db"

const PORT = process.env.PORT || 3001

const pool = new db()

pool.init()
  .then(() => {
    app.set('db', pool)
    app.listen(PORT, () => {
        console.log(`API listening on port ${PORT}.`)
      })
      .on('error', (error) => {
        throw new Error(error.message)
      })
  })
  .catch((err) => {
    console.log("Could not connect to DB: ", err)
  })

