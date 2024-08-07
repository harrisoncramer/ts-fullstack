import express from "express"
import debug from "@/middleware/debug"
import usersRouter from "@/routers/users"

const app = express()
app.use(express.json())
if(process.env.DEBUG) app.use(debug)

/* Routers */
app.use(usersRouter)

export default app
