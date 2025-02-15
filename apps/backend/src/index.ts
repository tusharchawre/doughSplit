import express from "express"
import { UserRouter } from "./routes/userRoutes"

const app = express()

app.use("api/v1/user", UserRouter)

app.listen(3000, ()=>{
    console.log("Listening!")
})