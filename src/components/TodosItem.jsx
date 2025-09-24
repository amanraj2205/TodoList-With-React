import React from 'react'
import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'


function TodosItem({todo}) {
    const [isTodoEditable,setItemEditable]= useState(false)
const [todoValue,setTodoValue]= useState(todo.todo)  // to store the updated value of todo

const {updateTodo,deleteTodo,toggleComplete} = useTodo()  // useTodo is custom hook to use the context

    const editTodo = () =>{
        if(setItemEditable(true))
        {updateTodo(todo.id,{...todo,todo:todoValue})  // call the updateTodo function from context
        setItemEditable(false) 
 } // close the edit mode
    }

    const toggleCompleted = () =>{
        toggleComplete(todo.id)  // call the toggleComplete function from context
    }

  return (
    <div 
    className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
    >
        <input type="checkbox"
        className='cursor-pointer'
        checked={todo.completed}
        onChange={toggleCompleted}  // toggle the completed status of the todo
         />
        
        <input type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"}`}   //conditional class
        value={todoValue}
        onChange={(e)=>setTodoValue(e.target.value)}  // update the todoValue state
        readOnly = {!isTodoEditable}  // make the input field readonly if not in edit mode
        />
       <button
       className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
       
        onClick ={()=>{
            if(todo.completed){
                return;
            }
            if(isTodoEditable){
                editTodo()  // save the updated todo
            }
            else{
                setItemEditable((prev)=>!prev)  //set as it is
            }
        }}
        disabled={todo.completed}  // disable the button if the todo is completed
         >
         {isTodoEditable ? "Save" : "Edit"}
         
          </button>
        <button className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
         onClick = {()=>deleteTodo(todo.id)}  // call the deleteTodo function from context
         >
        </button>
       


    </div>
  )
}

export default TodosItem