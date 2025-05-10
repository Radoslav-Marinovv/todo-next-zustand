'use client'

import Task from "../Task/Task"
import { StateTitle, Todo, useTodoStore } from "@/app/store/store";

type TodoListProps = {
  todos: Todo[];
  groupTitle: StateTitle;
}

export default function TodoList({ todos, groupTitle }: TodoListProps) {
  const onDragOver = useTodoStore(state => state.onDragOver);
  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    onDragOver(groupTitle);
  }
  return (
    <div
      onDragEnter={handleDragOver}
      className="flex flex-col gap-4 min-w-1/4 border">
      <h2 className="relative top-3 left-3 font-semibold">{groupTitle}</h2>
      {todos && todos.map((todo: Todo) => (
        <Task
          key={todo.id}
          {...todo}
        />
      ))}
    </div>
  );
}