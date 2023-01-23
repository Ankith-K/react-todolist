import React from "react"
import { useState, useRef , useEffect} from 'react'
import TodoList from "./TodoList.js";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "key"

function App() {

    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const existingTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (existingTodos) setTodos(existingTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    const addTodo = () =>{
        const task = todoNameRef.current.value
        if(task === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id : uuidv4(), name : task, complete : false}]
        })
        todoNameRef.current.value = null
    }

    const toggleTodo = (id) => {
        const currTodos = [...todos]
        const selTodo = currTodos.find(selTodo => selTodo.id === id)
        selTodo.complete = !selTodo.complete
        setTodos(currTodos)
    }

    const clearTodos = () => {
        setTodos([])
    }

    const clearCompletedTodos = () => {
        const currTodos = todos.filter(todo => !todo.complete)
        setTodos(currTodos)
    }
  return (
    <>
      <h1>My To-Do List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" placeholder="Task?"></input>
      <button onClick={addTodo}>Add Task</button>
      <button onClick={clearCompletedTodos}>Clear Completed Tasks</button>
      <button onClick={clearTodos}>Clear All Tasks</button>
      <h5>{todos.filter(todo => !todo.complete).length} tasks left</h5>
    </>
  );
}

export default App;
