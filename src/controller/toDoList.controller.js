import TodoList from "../models/toDoList.model.js";
import createResponse from "../utils/createResponse.js";

//them mới sản phẩm
export const createTodolist = async (req, res) => {
  const todolist = await TodoList.create(req.body);
  return res.status(201).json({
    message: " them moi thanh cong",
    data: todolist,
  });
};

//get in ra toan bo sản phẩm
export const getTodolist = async (req, res) => {
  const data = await TodoList.find();
  createResponse(res, 200, "successfully", data);
};

export const getByid = async (req, res) => {
  try {
    const { id } = req.params;

    const todolist = await TodoList.findById(id);

    if (!todolist) {
      return res.status(404).json({
        message: "TodoList không tồn tại",
      });
    }

    return res.status(200).json({
      message: "lấy todo thành công",
      data: todolist,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//cap nhat sản phẩm
export const createUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const todolist = await TodoList.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!todolist) {
      return res.status(404).json({
        message: "TodoList không tồn tại",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thành công",
      data: todolist,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//delete
export const deleteTodolist = async (req, res) => {
  try {
    const { id } = req.params;

    const todolist = await TodoList.findByIdAndDelete(id);

    if (!todolist) {
      return res.status(404).json({
        message: "TodoList không tồn tại",
      });
    }

    return res.status(200).json({
      message: "delete thành công",
      data: todolist,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
