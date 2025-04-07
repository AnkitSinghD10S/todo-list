import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';
function TodoForm() {
    const[todo,setTodo] =useState("")
    const {addTodo} = useTodo()

    const add =(e)=>{
        e.preventDefault()
        if(!todo){
            alert('Enter the task !');
            return
        }
        addTodo({todo,completed:false})
        setTodo("")
    }
    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className=" text-zinc-950 w-full border border-black  outline-none rounded-2xl px-3  duration-150 bg-violet-100 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-lg px-5 py-4 mx-3 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

