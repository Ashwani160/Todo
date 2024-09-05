import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm(){
    const [todo, setTodo]=useState();
    const {addTodo}=useTodo();

    const add=(e)=>{
        e.preventDefault();
        if(!todo)return
        addTodo({todo, completed:false})
        setTodo('')
    }

    return(
        <>
        <form className="flex" 
        onSubmit={add}
        >
            <input type='text' 
            placeholder="what to do"
            className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            value={todo}
            onChange={(e)=>{
                setTodo(e.target.value);
            }}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 hover:border-2 hover:border-[#f1ff5c] hover:transition-all duration-300 hover:-translate-y-1
            hover:shadow-[0em_0.5em_0.5em_-0.4em_#f1ff5c] hover:shadow-[#f1ff5c] hover:bg-transparent">ADD</button>
        </form>
        </>
    )
}

export default TodoForm;