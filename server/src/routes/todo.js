import express from "express"
import { body, query, validationResult } from 'express-validator';
const router = express.Router();
import Todo from "../models/Todo.js";
// Get all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos.map(todo => ({ id: todo._id, text: todo.text }) ));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a new todo
router.post('/todos', [
    body('text').isString().withMessage('Text must be string.').isLength({ min: 3 }).withMessage('Text must have a min length of 3 characters')
], async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const newTodo = await todo.save();
        return res.status(201).json({
            _id: newTodo._id,
            text: newTodo.text
        });
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
        await todo.deleteOne();
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
export default router;