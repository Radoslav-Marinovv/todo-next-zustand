'use client'

import { useState } from "react"
import { useTodoStore } from "@/app/store/store"

export default function AddTodo() {

  const [title, setTitle] = useState('')
  const addTodo = useTodoStore(state => state.addTodo)

  function handleAddTodo(title: string) {
    addTodo(title)
    setTitle('')
  }

  return (
    <div className="flex flex-row flex-none items-center gap-3 m-3 p-3 max-w-3xl border">
      <input
        type="text"
        placeholder="Add a new Todo"
        value={title}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTodo(title)
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        className="flex m-3 w-2xl border-l border-r"
      />
      <button
        type="button"
        onClick={() => handleAddTodo(title)}
        className="flex py-2 px-4 min-w-fit border bg-sky-500/75 hover:bg-sky-700/75 hover:font-stretch-50% active:bg-sky-700/70 active:text-amber-300 transition duration-300 ease-in-out"
      >Add Todo</button>
    </div>
  )
}