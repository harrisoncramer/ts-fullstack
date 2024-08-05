import express from "express";
import openApiValidatorMiddleware from "@/middleware/openapi"
import errorMiddleware from "@/middleware/errors"
import usersRouter from '@/routers/users'
import debug from "./middleware/debug";

const app = express()
if(process.env.DEBUG) app.use(debug)

/* Middleware for all routes */
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: false }))
app.use(openApiValidatorMiddleware)
app.use(errorMiddleware)

/* Routers */
app.use(usersRouter)

export default app;
