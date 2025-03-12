import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './todos/todo';
import { createTodosApi, deleteTodoApi, getTodosApi, updateTodoApi } from './todos/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type CreateTodoForm = {
  text: string
};

const schema = yup.object({
  text: yup.string().required(),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setText] = useState<string>('');
  const [newTodo, setNewTodo] = useState('')
  const [triggerFetchTodos, setTriggerFetchTodos] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    fetchTodos();
  }, [triggerFetchTodos]);

  const fetchTodos = () => {
    getTodosApi().then((response) => {
      const data = response.data;
      setTodos([...data])
    })
  }

  const deleteTodo = (id: string) => {
    deleteTodoApi(id).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    })
  }

  const editTodo = (id: string) => {
    const todoFind = todos.find(todo => todo.id === id);

    if (!todoFind) {
      return 1;
    }

    setEditId(id);
    setEditMode(true);
    setText(todoFind.text);

  }

  const updateTodo = (id: string) => {

    const newData = {text: editText};

    updateTodoApi(id, newData).then((response) => {
      setTriggerFetchTodos(true);
    }).catch((response) => {
      if (response.status == 422) {
        alert(9999);
      }
    })

    setEditMode(false);
    
  }

  const addTodo = (data: CreateTodoForm) => {
    createTodosApi(data).then((response) => {
      setTriggerFetchTodos(true);
    }).catch((response) => {
      if (response.status == 422) {
        alert(9999);
      }
    })
    
    setNewTodo('');
  }
  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🚀 Todo List</h2>

      <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit(addTodo)}>
        <input id="taskInput" {...register('text')} type="text" placeholder="Add a new task" className="p-2 border rounded-md focus:outline-none w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">Add</button>
      </form>
      {errors.text && <p id="errorMessage" className="text-red-500 text-sm hidden">Task cannot be empty!</p>}

      <ul className="space-y-2">

        {todos.map((todo, index) => (
          <li className="flex justify-between items-center bg-gray-200 p-2 rounded" key={index}>
            {editMode && todo.id === editId ? (
              <input type="text" value={editText} onChange={(e) => setText(e.target.value)} className="p-1 border rounded-md w-2/3 focus:outline-none" />
            ) : (
              <span>{todo.text}</span>
            )}

            <div>
              {editMode && todo.id === editId ? (
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-700" onClick={() => updateTodo(todo.id)}>Save</button>
              ) : (
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-700" onClick={() => editTodo(todo.id)}>Edit</button>
              )}

              <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-700 ml-2" onClick={() => deleteTodo(todo.id)}>Delete</button>

            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
