const express = require("express");
const app = express();
const cors = require('cors')
app.listen(4000, () => {
  console.log("server is on");
});
app.use(express.json());
app.use(cors())
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://mshahzaibsohail36:shahzaibmemon@cluster0.afaihz8.mongodb.net/Todo?retryWrites=true&w=majority")
  .then(console.log("Database Connected"));
const todoSchema = new mongoose.Schema({
  Task: String,
  Status: Boolean,
});
const Todo = mongoose.model("Todo", todoSchema);

app.post("/create", async (req, res) => {
  await Todo.create({ Task: req.body.Task, Status: req.body.Status }).then(
    res.status(200).json({
      success: true,
      message: "Task Created",
    })
  );
});

app.get("/all", async (req, res) => {
  const Result = await Todo.find({});
  res.json(Result);
});

app.get("/complete", async (req, res) => {
  const Result = await Todo.find({ Status: true });
  res.json(Result);
});

app.get("/incomplete", async (req, res) => {
  const Result = await Todo.find({ Status: false });
  res.json(Result);
});

app.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, {
    Status: req.body.Status,
  }).then(
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
    })
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id).then(
    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    })
  );
});

