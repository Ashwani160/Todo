import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos]=  useState([]);

  const addTodo=(todo)=>{
    setTodos((prev)=>{
      return [{id:Date.now(), ...todo}, ...prev]
    })
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>{
      return prev.filter((todo)=>{
        return todo.id!==id;
      })
    })
  }

  const updateTodo=(id, todo)=>{
    setTodos((prev)=>{
      return prev.map((prevTodo)=>{
        if(prevTodo.id !== id){
          return prevTodo;
        }
        else{
          return todo;
        }
      })
    })
  }
  const toggleTodo=(id)=>{
    setTodos((prev)=>{
      return prev.map((todo)=>{
        if(todo.id ===id){
          return {...todo, completed: !todo.completed}
        }
        else{
          return todo;
        }
      })
    })
  }
  useEffect(()=>{
    const todos =JSON.parse(localStorage.getItem('todos'));

    if(todos && todos.length>0){
      setTodos(todos);
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleTodo}}>
    <div className="bg-purple-900 text-white text-2xl py-3 text-center">ToDo using local storage</div>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
