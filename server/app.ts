import express, { Request, Response } from "express"
import debug from "@/middleware/debug"
import db from "@/middleware/debug"

const app = express()
app.use(express.json())
if(process.env.DEBUG) app.use(debug)
app.use(db)

app.set("db", db)

/* Routes */
app.get('/api/v1/users', (_req: Request, res: Response) => {
  res.status(200).send()
})

export default app
