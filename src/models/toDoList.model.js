import mongoose, { Schema } from "mongoose";

const todoListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    dueDate: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TodoList = mongoose.model("TodoList", todoListSchema);

export default TodoList;
