'use client'

import Task from "../Task/Task"
import { StateTitle, Todo, useTodoStore } from "@/app/store/store";

type TodoListProps = {
  todos: Todo[];
  groupTitle: StateTitle;
}

export default function TodoList({ todos, groupTitle }: TodoListProps) {
  const onDragOver = useTodoStore(state => state.onDragOver);
  const clearDrag = useTodoStore(state => state.clearDrag);

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    onDragOver(groupTitle);
  }

  return (
    <div
      onDragEnter={handleDragOver}
      onDragEnd={clearDrag}
      className="flex flex-col gap-4 lg:w-[30%] min-h-12 lg:max-w-[30%] border">
      <h2 className="relative top-3 left-3 font-semibold">{groupTitle}</h2>
      <div className="border w-[90%] self-center"></div>
      {todos && todos.map((todo: Todo) => (
        <Task
          key={todo.id}
          {...todo}
        />
      ))
      }
      {todos.length === 0 &&
        <div className="mb-4">
          <p className="text-center text-gray-500">No todo&#39;s in this column</p>
        </div>}
    </div>
  );
}