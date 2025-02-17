import express from "express";
import { UserRouter } from "./routes/userRoutes";
const app = express();

app.use("api/v1/user", UserRouter);

app.listen(3001, () => {
  console.log("Listening!");
});
