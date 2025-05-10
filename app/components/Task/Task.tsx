'use client'

import { useTodoStore, type Todo } from "@/app/store/store";
import { STATE_DONE, STATE_ONGOING, STATE_TODO } from "@/app/constants/constants";

export default function Todo({ id, title, stateTitle, completed }: Todo) {

  const borderColor = stateTitle === STATE_TODO ? 'border-red-500' :
    stateTitle === STATE_ONGOING ? 'border-yellow-300' :
      stateTitle === STATE_DONE ? 'border-green-300' : 'border-gray-500';

  const changeCompleted = useTodoStore(state => state.changeCompleted);
  const onDragStart = useTodoStore(state => state.onDragStart);
  const removeTodo = useTodoStore(state => state.removeTodo);

  function handleRemoveTodo(event: React.MouseEvent, id: Todo['id']) {
    event.preventDefault();
    removeTodo(id);
  }
  return (
    <div
      draggable
      onDrag={() => onDragStart(id)}
      className={`flex flex-row justify-between items-baseline p-3 m-3 border-b-2 ${borderColor} hover:cursor-pointer even:bg-cyan-900/75 odd:bg-yellow-600/75 rounded-md`}>
      <section
        onClick={() => changeCompleted(id)}
        className="flex justify-center items-center border rounded-full w-4 h-4 p-4 hover:cursor-default">
        <input
          type="checkbox"
          onChange={() => { }}
          checked={completed}
        ></input>
      </section>
      <section className="flex gap-8">
        <p className={`${completed && 'line-through'}`}>{title}</p>
      </section>
      <section
        className="flex flex-row justify-center items-center border rounded-full w-4 h-4 p-4 hover:cursor-default"
      >
        <button
          onClick={(event) => handleRemoveTodo(event, id)}
          className="hover:bg-red-700/75 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 stroke-current stroke-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </section>
    </div>
  );
}