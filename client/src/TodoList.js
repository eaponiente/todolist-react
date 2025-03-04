import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    useEffect(() => {
      fetchTodos();
    }, []);
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/todos');
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const createTodo = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/todos', { text: newTodo });
        setTodos([...todos, res.data]);
        setNewTodo('');
      } catch (err) {
        console.error(err);
      }
    };
    const deleteTodo = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
      } catch (err) {
        console.error(err);
      }
    };
    return (
      <div>
        <h1>Todo List</h1>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
        />
        <button onClick={createTodo}>Add Todo</button>
        <ul>
          {todos.map(todo => (
            <li key={todo._id}>
              {todo.text}
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default TodoList;