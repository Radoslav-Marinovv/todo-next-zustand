'use client'

import { useState } from "react";

export default function Todo() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className="flex flex-row justify-between items-baseline p-3 m-3 border-b-2 border-gray-300">
      <input type="checkbox" onChange={handleCheckboxChange} checked={isChecked} name="vehicle1" value="Bike"></input>
      <p className={`${isChecked && 'line-through'}`}>Task...</p>
      <section>End:</section>
    </div>
  );
}