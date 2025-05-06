import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";

export default function Home() {
  return (
    <>
      <main className="flex flex-col overscroll-none gap-6 justify-center h-screen">
        <div className="flex flex-none justify-center">
          <AddTodo />
        </div>
        <div className="flex flex-row flex-1 gap-3 mb-6 justify-center">
          <TodoList />
          <TodoList />
          <TodoList />
        </div>
      </main>
    </>
  );
}
