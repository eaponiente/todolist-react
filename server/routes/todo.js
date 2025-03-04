const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  // Create a new todo
  router.post('/todos', async (req, res) => {
    const todo = new Todo({
      text: req.body.text
    });
    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  // Delete a todo
  router.delete('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      await todo.remove();
      res.json({ message: 'Todo deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  module.exports = router;