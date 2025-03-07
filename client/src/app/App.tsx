import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './todos/todo';
import { createTodosApi, deleteTodoApi, fetchTodosApi, getTodosApi } from './todos/api';
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
      setTodos([...todos, ...data])
    })
  }

  const deleteTodo = (id: string) => {
    deleteTodoApi(id).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    })
  }

  const addTodo = (data: CreateTodoForm) => {
    createTodosApi(data).then((response) => {
      setTodos([...todos, ...response.data]);
    }).catch((response) => {
      if (response.status == 422) {
        alert(9999);
      }
    })
    setTriggerFetchTodos(true);
    setNewTodo('');
  }
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSubmit(addTodo)} className="flex items-center gap-4 w-full">
          <input
            type="text"
            {...register("text")}
            className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-1 ${errors.text ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            placeholder="Enter a task..."
          />
          
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </form>
      </div>
      {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}

      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-6 py-3 text-center">ID</th>
            <th className="px-6 py-3 text-center">Task</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition">
              <td className="px-6 py-4 text-center">{todo.id}</td>
              <td className="px-6 py-4 text-center">{todo.text}</td>
              <td className="px-6 py-4 text-left">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-700">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-700 ml-2" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
