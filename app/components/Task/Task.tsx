'use client'

import { useEffect, useState } from "react";
import { useTodoStore, type Todo } from "@/app/store/store";
import { MAX_TODO_LENGTH, STATE_DONE, STATE_ONGOING, STATE_TODO } from "@/app/constants/constants";

export default function Todo({ id, title, stateTitle, completed }: Todo) {

  const borderColorStyle = stateTitle === STATE_TODO ? 'border-red-500/95' :
    stateTitle === STATE_ONGOING ? 'border-yellow-500/95' :
      stateTitle === STATE_DONE ? 'border-green-500/75' :
        '';

  const stateTextDecorationStyle = stateTitle === STATE_DONE ? 'line-through' : '';


  const [editMode, setEditMode] = useState(true);
  const [newTitle, setNewTitle] = useState(title);

  const removeTodo = useTodoStore(state => state.removeTodo);
  const onDragStart = useTodoStore(state => state.onDragStart);
  const changeTitle = useTodoStore(state => state.changeTitle);
  const changeCompleted = useTodoStore(state => state.changeCompleted);

  function handleTodoEditModeEdit(event: React.MouseEvent | React.TouchEvent) {
    event.preventDefault();
    setEditMode(false);
  }

  function handleTodoEditModeDone(event: React.MouseEvent | React.TouchEvent) {
    event.preventDefault();
    setEditMode(true);
    changeTitle(id, newTitle);
  }

  function handleRemoveTodo(event: React.MouseEvent | React.TouchEvent, id: Todo['id']) {
    event.preventDefault();
    removeTodo(id);
  }

  useEffect(() => {
    if (stateTitle === STATE_DONE) {
      changeCompleted(id, true);
    } else {
      changeCompleted(id, false);
    }
  }, [stateTitle, changeCompleted, id]);

  return (
    <div
      draggable={editMode}
      onDragStart={() => onDragStart(id)}
      className={`flex flex-row gap-2 justify-center max-w-full hover:cursor-pointer text-lg`}>
      <section className="lg:w-3/4 w-11/12">
        {editMode ?
          <>
            <p className={`${stateTextDecorationStyle} text-wrap border-2 border-gray-500/75 p-2 w-full h-full`}>{title}</p>
            <section className={`border-2 ${borderColorStyle} m-0 p-0`}></section>
          </> :
          <>
            <textarea
              name="title"
              minLength={1}
              maxLength={MAX_TODO_LENGTH}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className={`wrap-break-word p-2 text-wrap border-2 w-full h-full border-green-500/75 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 ease-in-out`}>
            </textarea>
          </>
        }

      </section>
      <section
        className="flex flex-col gap-3 p-3 justify-center items-center border rounded-full w-fit h-full hover:cursor-default"
      >
        {editMode ?
          !completed && <button
            type="button"
            title="edit start button"
            onClick={handleTodoEditModeEdit}
            className="hover:bg-blue-700/75 border rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 stroke-current stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.5 2.5 0 00-3.536 0L4.5 11.25V17h5.75l8.826-8.826a2.5 2.5 0 000-3.536l-1.414-1.414z" />
            </svg>
          </button> : <button
            type="button"
            title="edit finish button"
            onClick={handleTodoEditModeDone}
            className="hover:bg-green-700/75 bg-green-600 border rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 stroke-current stroke-2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12l6 6L19.5 7" />
            </svg>
          </button>}
        {!completed && <div className="border w-full"></div>}
        <button
          type="button"
          title="delete button"
          onClick={(event) => handleRemoveTodo(event, id)}
          className="hover:bg-red-700/75 border rounded-full p-1 min-w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 stroke-current stroke-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 6.75l-1.5 12a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25l-1.5-12m15-3h-4.5m-6 0H4.5m3 0V3a1.5 1.5 0 013 0v1.5m6 0V3a1.5 1.5 0 00-3 0v1.5m6 0h-9" />
          </svg>
        </button>
      </section>
    </div>
  );
}