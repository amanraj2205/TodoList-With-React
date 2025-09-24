import { createContext,useContext } from "react";


export const TodoContext = createContext({
    todos: [
        { 
            id: 1,
            todo:"Todo message",
            completed: false
        }
    ],
    addTodo: () => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}   //to marks iscompleted or not
});


export const useTodo = () =>{
 return useContext(TodoContext); 
}   //custom hook to use the context  


export const TodoProvider = TodoContext.Provider;  //provider component to wrap around the app