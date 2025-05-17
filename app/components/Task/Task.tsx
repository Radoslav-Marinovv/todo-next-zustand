'use client'

import Image from "next/image";
import TrashCan from "../../../public/trash-can.svg"

import { useEffect, useState } from "react";
import { useTodoStore, type Todo } from "@/app/store/store";
import { MAX_TODO_LENGTH, STATE_DONE, STATE_ONGOING, STATE_TODO } from "@/app/constants/constants";

export default function Todo({ id, title, stateTitle, completed }: Todo) {

  const borderColorStyle = stateTitle === STATE_TODO ? 'border-red-500' :
    stateTitle === STATE_ONGOING ? 'border-yellow-300' :
      stateTitle === STATE_DONE ? 'border-green-300' :
        '';

  const stateTextDecorationStyle = stateTitle === STATE_DONE ? 'line-through' : '';

  const stateTextColorStyle = stateTitle === STATE_DONE ? 'text-green-300/75' :
    stateTitle === STATE_ONGOING ? 'text-yellow-300/75' :
      '';

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
      onDrag={() => onDragStart(id)}
      className={`flex flex-row justify-between p-3 m-3 max-w-full border-b-2 ${borderColorStyle} hover:cursor-pointer even:bg-cyan-900/75 odd:bg-yellow-600/75 rounded-md`}>
      <section className="lg:w-3/4 w-11/12">
        {editMode ?
          <>
            <p className={`${stateTextDecorationStyle} ${stateTextColorStyle} text-wrap border-2 border-gray-500/75 p-2 w-full h-full`}>{title}</p>
          </> :
          <>
            <textarea
              name="title"
              minLength={1}
              maxLength={MAX_TODO_LENGTH}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className={`${stateTextDecorationStyle} wrap-break-word text-wrap border-2 p-2 w-full h-full border-green-500/75`}>
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
            title="edit button"
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
            title="edit button"
            onClick={handleTodoEditModeDone}
            className="hover:bg-blue-700/75 border rounded-full p-1">
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
          <Image about="trash can"
            width={24}
            height={24}
            src={TrashCan.src}
            alt="trash can"
            className="h-6 w-6 min-w-fit"
          />
        </button>
      </section>
    </div>
  );
}