import Task from "../Task/Task"

export default function TodoList() {
  return (
    <div className="flex flex-col gap-4 min-w-1/4 border">
      <h2 className="relative top-3 left-3 font-semibold">Todo NAME</h2>
      <Task />
      <Task />
      <Task />
    </div>
  );
}