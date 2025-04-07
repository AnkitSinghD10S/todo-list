/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`border w-full  rounded-4xl ${
                  isTodoEditable ? "border-none border-black  px-2 bg-amber-50" : "border-transparent "
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
          <button
              className=" w-8 h-8 rounded-lg border border-black bg-amber-50 hover:bg-green-400 disabled:opacity-1"
              onClick={() => {
                  if (todo.completed) return;
                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((isTodoEditable) => {
                    return !isTodoEditable
                  });
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>
          <button
              className="w-9 h-8 rounded-lg border border-black bg-amber-50 hover:bg-red-400"
              onClick={() => deleteTodo(todo.id)}
          >
            🗑️
          </button>
      </div>
  );
}
export default TodoItem;
