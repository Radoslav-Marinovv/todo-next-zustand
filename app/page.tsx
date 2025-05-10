'use client'

import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { getTodosByState, useTodoStore } from "./store/store";
import { STATE_DONE, STATE_ONGOING, STATE_TODO } from "./constants/constants";

export default function Home() {
  const todos = useTodoStore(state => state.todos);
  const todoState = getTodosByState(todos, STATE_TODO);
  const ongoingState = getTodosByState(todos, STATE_ONGOING);
  const doneState = getTodosByState(todos, STATE_DONE);

  return (
    <>
      <main className="flex flex-col overscroll-none gap-6 justify-center h-screen">
        <div className="flex flex-none justify-center">
          <AddTodo />
        </div>
        <div className="flex flex-row flex-1 gap-3 mb-6 justify-center">
          <TodoList todos={todoState} groupTitle={STATE_TODO} />
          <TodoList todos={ongoingState} groupTitle={STATE_ONGOING} />
          <TodoList todos={doneState} groupTitle={STATE_DONE} />
        </div>
      </main>
    </>
  );
}
