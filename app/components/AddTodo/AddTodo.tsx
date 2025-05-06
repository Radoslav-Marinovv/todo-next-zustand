export default function AddTodo() {
  return (
    <div className="flex flex-row flex-none items-center gap-3 m-3 p-3 max-w-3xl border">
      <input
        type="text"
        className="flex m-3 w-2xl border-l border-r"
      />
      <button
        type="button"
        className="flex py-2 px-4 min-w-fit border bg-sky-500/75 hover:bg-sky-700/75 hover:font-stretch-50% active:bg-sky-700/70 active:text-amber-300 transition duration-300 ease-in-out"
      >Add Todo</button>
    </div>
  )
}