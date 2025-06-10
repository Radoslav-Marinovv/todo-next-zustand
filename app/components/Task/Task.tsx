'use client'

import { useEffect, useState } from "react";
import { useTodoStore, type Todo } from "@/app/store/store";
import { MAX_TODO_LENGTH, STATE_DONE, STATE_ONGOING, STATE_TODO } from "@/app/constants/constants";
import RemoveTodoButton from "../Buttons/RemoveTodoButton";
import EditTodoStartButton from "../Buttons/EditTodoStartButton";
import EditTodoDoneButton from "../Buttons/EditTodoDoneButton";

export default function Todo({ id, title, stateTitle, completed }: Todo) {

  const borderColorStyle = stateTitle === STATE_TODO ? 'border-red-500/95' :
    stateTitle === STATE_ONGOING ? 'border-yellow-500/95' :
      stateTitle === STATE_DONE ? 'border-green-500/75' :
        '';

  const stateTextDecorationStyle = stateTitle === STATE_DONE ? 'line-through' : '';

  const [editMode, setEditMode] = useState(true);
  const [newTitle, setNewTitle] = useState(title);

  const onDragStart = useTodoStore(state => state.onDragStart);
  const changeCompleted = useTodoStore(state => state.changeCompleted);

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
        className="flex flex-col gap-3 p-3 justify-center items-center border rounded-full w-fit h-fit hover:cursor-default"
      >
        {
          editMode ?
            !completed &&
            <EditTodoStartButton setEditMode={setEditMode} />
            :
            <>
              <EditTodoDoneButton id={id} newTitle={newTitle} setEditMode={setEditMode} />
              {!completed && <div className="border w-full"></div>}
              <RemoveTodoButton id={id} />
            </>
        }

        {completed && <RemoveTodoButton id={id} />}
      </section>
    </div>
  );
}