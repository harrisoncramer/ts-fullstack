import express from "express"
import openapi from "@/middleware/openapi"
import errors from "@/middleware/errors"
import usersRouter from '@/routers/users'

const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: false }))
app.use(openapi)
app.use(errors)
app.use(usersRouter)

export default app;
