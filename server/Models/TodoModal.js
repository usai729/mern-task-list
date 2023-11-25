const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todoTitle: {
    type: String,
  },
  todoDesc: {
    type: String,
  },
  priority: {
    type: String,
    default: "Low❄️",
  },
  added: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  of: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "User",
  },
});

const TodoModel = mongoose.model("Todos", TodoSchema);
module.exports = TodoModel;

/**
 * 🤏
 * 🔥
 */
