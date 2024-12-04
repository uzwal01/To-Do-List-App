import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);

const inputRef = useRef();

/* ----- ADD in todo ------ */
const add = ()=>{
    const inputText = inputRef.current.value.trim();
    
    if(inputText === ""){
        return null;
    }
    const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
    }
    setTodoList((prev=> [...prev, newTodo]));
    inputRef.current.value= "";
}

/* ----- Delete in todo ------ */
const deleteTodo = (id)=>{
    setTodoList((prevTodos)=>{
       return prevTodos.filter((todo)=> todo.id !==id)
    })
}

/* ----- Toggle(Completed/Incompeted) in todo ------ */
const toggle = (id)=>{
    setTodoList((prevTodos)=>{
        return prevTodos.map((todo)=>{
            if(todo.id === id){
                return {...todo, isComplete: !todo.isComplete}
            }
            return todo;
        })
    })
}


/* ----- Save in LocalStorage in todo ------ */
useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList));
    console.log(todoList);
},[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

{/* ----- title ------ */}

    <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
    </div>

{/* ----- input box ------ */}

    <div className='flex items-center my-7 bg-gray-200 rounded-full shadow-lg'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pr-2 pl-6 placeholder:text-slate-600 ' type="text" placeholder='Add our task' />
        <button onClick={add} className='border-none rounded-full bg-[#fa6023] text-white w-[7rem] h-14 font-semibold text-[18px] shadow'> ADD</button>
    </div>

{/* ----- todo list------ */}

    <div>
    {todoList.map((item, index)=>{
        return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
    })}

    
    </div>
    </div>
  )
}

export default Todo
