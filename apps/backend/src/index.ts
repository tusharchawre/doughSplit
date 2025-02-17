import express from "express";
import { UserRouter } from "./routes/userRoutes";
import cors from "cors"
import { GroupRouter } from "./routes/groupRoutes";

const app = express();
app.use(cors())

app.use(express.json())
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/group", GroupRouter)

app.listen(3001, () => {
  console.log("Listening!");
});