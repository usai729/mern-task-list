const TodoModel = require("../Models/TodoModal");
const User = require("../Models/User");

exports.addtodo = async (req, res) => {
  const { title, desc, priority } = req.body;

  const user = await User.findById(req.user.id);

  try {
    const newTodo = new TodoModel({
      todoTitle: title,
      todoDesc: desc,
      priority: priority,
      of: user.id,
    });

    newTodo.save();

    const todos = await TodoModel.find({ of: req.user.id });
    console.log(todos);

    res.json({ msg: "success/todo-added", todos: todos });
  } catch (e) {
    console.log(e);
    res.json({ msg: "error/Internal Server Error" });

    console.log(req.user.id);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({
      of: req.user.id,
    }).sort({ completionDate: -1 });

    return res.json({ msg: "success/todos", todos });
  } catch (e) {
    console.log(e);

    return res.json({ msg: "error/internal-server-error" });
  }
};

exports.deleteTodo = async (req, res) => {
  const todoid = req.params.id;

  console.log(todoid);

  try {
    const del = await TodoModel.findOneAndDelete({ _id: todoid });

    res.redirect("http://localhost:3000");
  } catch (e) {
    console.log(e);
    res.json({ msg: "error/internal-server-error" });
  }
};

exports.updateTodo = async (req, res) => {
  const { type, id } = req.body;

  if (type === "COMPLETE") {
    await TodoModel.findByIdAndUpdate(id, [
      {
        $set: {
          completed: true,
        },
      },
    ]);

    res.json({
      msg: "success",
    });
  } else {
    const { title, desc, priority } = req.body;

    await TodoModel.findByIdAndUpdate(id, [
      {
        $set: {
          todoTitle: title,
          todoDesc: desc,
          priority: priority,
        },
      },
    ]);

    res.json({
      msg: "success",
    });
  }
};
