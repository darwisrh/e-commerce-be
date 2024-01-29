import * as express from "express"
import { Express, Request, Response } from "express"

const app: Express = express()
const port: Number = 3000

app.get("/", (_: Request, res: Response) => {
   res.send(`<h1 style="font-size: 60px;">Hello world</h1>`)
})

app.listen(port, () => {
   console.log(`Server run at : http://localhost:${port}`)   
})