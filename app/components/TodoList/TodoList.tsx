'use client'

import Task from "../Task/Task"
import { StateTitle, Todo, useTodoStore } from "@/app/store/store";

type TodoListProps = {
  todos: Todo[];
  groupTitle: StateTitle;
}

export default function TodoList({ todos, groupTitle }: TodoListProps) {
  const onDragEnterGroup = useTodoStore(state => state.onDragEnterGroup);
  const onDragEnterElement = useTodoStore(state => state.onDragEnterElement);
  const clearDrag = useTodoStore(state => state.clearDrag);

  function handleDragEnterGroup(event: React.DragEvent) {
    event.preventDefault();
    onDragEnterGroup(groupTitle);
  }
  function handleDragEnterElement(event: React.DragEvent, todoId: Todo['id']) {
    event.preventDefault();
    onDragEnterElement(todoId);
  }

  return (
    <div
      onDragEnter={handleDragEnterGroup}
      onDragEnd={clearDrag}
      className="flex flex-col gap-4 lg:w-[30%] min-h-12 lg:max-w-[30%] border">
      <h2 className="relative top-3 left-3 font-semibold">{groupTitle}</h2>
      <div className="border w-[90%] self-center"></div>
      {todos && todos.map((todo: Todo) => (
        <div
          key={todo.id}
          onDragEnter={(event) => { handleDragEnterElement(event, todo.id) }}
          className="rounded-md last:mb-8"
        >
          <Task
            {...todo}
          />
        </div>
      ))
      }
      {todos.length === 0 &&
        <div className="mb-4">
          <p className="text-center text-gray-500">No todo&#39;s here</p>
        </div>}
    </div>
  );
}