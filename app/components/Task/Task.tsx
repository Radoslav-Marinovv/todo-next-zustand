'use client'

import { useTodoStore, type Todo } from "@/app/store/store";
import { STATE_DONE, STATE_ONGOING, STATE_TODO } from "@/app/constants/constants";

export default function Todo({ id, title, stateTitle, completed }: Todo) {

  const borderColor = stateTitle === STATE_TODO ? 'border-red-500' :
    stateTitle === STATE_ONGOING ? 'border-yellow-500' :
      stateTitle === STATE_DONE ? 'border-green-500' : 'border-gray-500';

  const changeCompleted = useTodoStore(state => state.changeCompleted);

  return (
    <div
      className={`flex flex-row justify-between items-baseline p-3 m-3 border-b-2 ${borderColor}`}>
      <input
        type="checkbox"
        onChange={() => changeCompleted(id)}
        checked={completed}
        name="vehicle1"
        value="Bike"></input>
      <p className={`${completed && 'line-through'}`}>{title}</p>
    </div>
  );
}