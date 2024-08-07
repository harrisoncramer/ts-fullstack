import express from "express"
import debug from "@/middleware/debug"
import db from "@/db"
import usersRouter from "@/routers/users"

const app = express()
app.use(express.json())
app.set("db", db)
if(process.env.DEBUG) app.use(debug)

/* Routers */
app.use(usersRouter)

export default app
