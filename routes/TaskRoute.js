//Routes are the "doors" of your API — without registering a route, even if the controller function exists, no one can call it
const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  markComplete,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Create task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Mark task as completed
router.patch("/:id/complete", markComplete);

// Update task details
router.put("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;