import { Router } from "express";
import {
  createTodolist,
  createUpdate,
  deleteTodolist,
  getByid,
  getTodolist,
} from "../controller/toDoList.controller.js";

const todolistRoutes = Router();
todolistRoutes.post("/", createTodolist);
todolistRoutes.get("/", getTodolist);
todolistRoutes.get("/:id", getByid);
todolistRoutes.patch("/:id", createUpdate);
todolistRoutes.delete("/:id", deleteTodolist);

export default todolistRoutes;
