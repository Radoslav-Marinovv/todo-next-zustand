'use client'

import Task from "../Task/Task"
import { Todo } from "@/app/store/store";

type TodoListProps = {
  todos: Todo[];
  groupTitle?: string;
}

export default function TodoList({ todos, groupTitle }: TodoListProps) {
  return (
    <div className="flex flex-col gap-4 min-w-1/4 border">
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