import React from 'react'

export default function Todo({todo, toggleTodo}) {
    const handleTodoClick = () => {
        console.log("reached");
        toggleTodo(todo.id);
    }
  return (
    <div>
        <label>
          <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input>
          {todo.name}
        </label>
      
    </div>
  )
}
