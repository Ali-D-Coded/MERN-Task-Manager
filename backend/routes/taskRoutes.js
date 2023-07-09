const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create a new task
router.post("/tasks/create", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Read all tasks
router.get("/tasks/all", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Read a single task
router.get("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Update a task
router.put("/tasks/update/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;
    console.log({title});
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/tasks/delete/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndRemove(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
