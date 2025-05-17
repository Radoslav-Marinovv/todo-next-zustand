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
      <main className="flex flex-col gap-6 items-center min-h-screen min-w-fit w-full bg-gradient-to-b from-slate-900 to-slate-800/75">
        <AddTodo />
        <div className="flex flex-col lg:flex-row w-full gap-3 justify-center">
          <TodoList todos={todoState} groupTitle={STATE_TODO} />
          <div className="max-lg:border-2 max-lg:rounded-2xl max-lg:w-full"></div>
          <TodoList todos={ongoingState} groupTitle={STATE_ONGOING} />
          <div className="max-lg:border-2 max-lg:rounded-2xl max-lg:w-full"></div>
          <TodoList todos={doneState} groupTitle={STATE_DONE} />
        </div>
      </main>
    </>
  );
}
