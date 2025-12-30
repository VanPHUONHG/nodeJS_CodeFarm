import mongoose, { Schema } from "mongoose";

const todoListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    dueDate: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    isImportant: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TodoList = mongoose.model("TodoList", todoListSchema);

export default TodoList;
