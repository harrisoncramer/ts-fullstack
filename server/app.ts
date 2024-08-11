import express from "express"

import debug from "@/middleware/debug"
import errorHandler from '@/middleware/errors'
import usersRouter from "@/routers/users"

const app = express()
app.use(express.json())
if(process.env.DEBUG) app.use(debug)

/* Routers */
app.use(usersRouter)
app.use(errorHandler)

export default app
