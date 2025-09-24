import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoContext, TodoProvider } from './contexts/TodoContext'
import { TodosItem } from './components'
import { TodosFrom } from './components'

function App() {
  const [todos,setTodos] = useState([])

  const addTodo = (todo) =>{
    //logic to add todo
   setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }
 const updateTodo = (id,todo) =>{
  setTodos((prev)=>
  prev.map((prevTodo)=>(prevTodo.id===id ? {todo,prevTodo} : prevTodo)))
 }

 const deleteTodo = (id) =>{
  setTodos((prev)=>prev.filter((todo)=>todo.id !== id))  //filter out the todo with the given id
 }

  const toggleComplete = (id) =>{
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );  // spend the prev todos and toggle the completed status of the todo with the given id
  }

  useEffect(() =>{
  localStorage.setItem("todos",JSON.stringify(todos))  //store data in local storage  it store only string so we need to convert it to string
  },[todos])  // this is run whenever todos change


useEffect(() =>{   // this is run only when app is loaded first time
 const todos = JSON.parse(localStorage.getItem("todos"))  //get data from local storage

 if(todos && todos.length>0){   //to check if it is not empty otherwise crash the app
  setTodos(todos)
 }

},[])

  return (
 <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodosFrom />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodosItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
