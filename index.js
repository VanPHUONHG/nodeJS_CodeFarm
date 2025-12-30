import express from "express";
import connectDB from "./src/configs/connectDB.js";
import notFoundRequest from "./src/middlewares/notFoundRequest.js";
import { HOST, PORT } from "./src/configs/dotenvConfig.js";
import todolistRoutes from "./src/routes/todolist.routes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/", todolistRoutes);

// * handle Notfound Request
app.use(notFoundRequest);

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
