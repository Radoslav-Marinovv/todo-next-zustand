'use client'

import { useState } from "react"
import { useTodoStore } from "@/app/store/store"
import { MAX_TODO_LENGTH } from "@/app/constants/constants"

export default function AddTodo() {

  const [title, setTitle] = useState('')
  const addTodo = useTodoStore(state => state.addTodo)

  function handleAddTodo(title: string) {
    if (title.trim().length === 0) {
      return;
    }
    addTodo(title)
    setTitle('')
  }

  return (
    <div className="flex flex-row justify-center items-center gap-3 m-3 p-3 min-w-fit w-full max-w-3xl border rounded-lg">
      <textarea
        minLength={1}
        maxLength={MAX_TODO_LENGTH}
        placeholder="Add a new Todo"
        value={title}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTodo(title)
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}
        className="text-lg wrap-break-word min-w-fit w-full max-w-2xl border rounded-lg p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition duration-300 ease-in-out"
      />
      <button
        type="button"
        onClick={() => handleAddTodo(title)}
        className="flex py-2 px-4 min-w-fit border bg-sky-500/75 hover:bg-sky-700/75 hover:font-stretch-50% active:bg-sky-700/70 active:text-amber-300 transition duration-300 ease-in-out"
      >Add Todo</button>
    </div>
  )
}