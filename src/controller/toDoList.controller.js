import TodoList from "../models/toDoList.model.js";
import createResponse from "../utils/createResponse.js";

//TẠO CÔNG VIỆC
export const createTodolist = async (req, res) => {
  const todolist = await TodoList.create(req.body);
  createResponse(res, 201, "Tạo công việc thành công", todolist);
};

//LẤY DANH SÁCH CÔNG VIỆC
export const getTodolist = async (req, res) => {
  const {
    search,
    isComplete,
    priority,
    category,
    page = 1,
    limit = 10,
  } = req.query;

  const skip = (page - 1) * limit;

  const query = {};

  // Tìm kiếm theo tên
  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  // Lọc theo trạng thái hoàn thành
  if (isComplete !== undefined) {
    query.isComplete = isComplete === "true";
  }

  // Lọc theo độ ưu tiên
  if (priority) {
    query.priority = priority;
  }

  // Lọc theo danh mục
  if (category) {
    query.category = category;
  }

  const data = await TodoList.find(query)
    .populate("category")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  createResponse(res, 200, "Lấy danh sách thành công", data);
};

// LẤY CHI TIẾT CÔNG VIỆC
export const getById = async (req, res) => {
  const todolist = await TodoList.findById(req.params.id).populate("category");

  if (!todolist) {
    return createResponse(res, 404, "TodoList không tồn tại");
  }

  createResponse(res, 200, "Lấy chi tiết thành công", todolist);
};

// CẬP NHẬT CÔNG VIỆC
export const createUpdate = async (req, res) => {
  const todolist = await TodoList.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!todolist) {
    return createResponse(res, 404, "TodoList không tồn tại");
  }

  createResponse(res, 200, "Cập nhật thành công", todolist);
};

// XÓA CÔNG VIỆC
export const deleteTodolist = async (req, res) => {
  const todolist = await TodoList.findByIdAndDelete(req.params.id);

  if (!todolist) {
    return createResponse(res, 404, "TodoList không tồn tại");
  }

  createResponse(res, 200, "Xóa thành công", todolist);
};
