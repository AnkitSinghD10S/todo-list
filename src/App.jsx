import { useState, useEffect } from 'react'
import { TodoContext } from './contexts/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  console.log(todos);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...todos])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {

    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    completed = 0;
    pendingCount = 0;
  }, [todos])

  let completed = todos.filter((todo) => todo.completed).length;
  let pendingCount = todos.length - completed;

  console.log(completed);
  console.log(pendingCount);



  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>

      <div className="bg-amber-50 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-[#000000">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className='text-center m-5 '>
            <span className='p-4 mx-2.5 font-bold'>Task Pending {pendingCount}</span>
            <span className='p-4 mx-2.5 font-bold'>Task Completed {completed}</span>
          </div>
          {(pendingCount || completed) ?
            <div className="w-full bg-red-600 rounded-full h-5 my-4">
              <div
                className="bg-green-500 h-5 rounded-full transition   "
                style={{ width: `${(completed / (todos.length)) * 100}%` }}
              ></div>
            </div> : <span></span>}
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  )
}

export default App