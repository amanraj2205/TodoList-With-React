import React from 'react'
import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodosFrom() {
    const [todo,setTodo] = useState("")
    const {addTodo} =useTodo()   // useTodo is custom hook to use the context

     const add = (e) =>{
        e.preventDefault()
        if(!todo) return;
        addTodo({todo,completed:false})  // call the addTodo function from context
        setTodo("")  // clear the input field
     }
  return (
    <form onSubmit={add} className='flex gap-2'>
    <input type="text" 
     placeholder='Add a todo'
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}  // update the todo state
    />
    <button type="submit" className='rounded-r-lg px-3 bg-green-400 text-white shrink-0'></button>
        </form>
  )
}

export default TodosFrom