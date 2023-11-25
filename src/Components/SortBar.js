import React from "react";

import { FaSort } from "react-icons/fa";

export default function SortBar({
  completed,
  setCompleted,
  pending,
  setPending,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-gray-700 mt-2 pb-4 pt-4">
      <p className="text-md items-center hidden md:flex gap-1">
        <FaSort />
        Sort
      </p>
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <input
                type="checkbox"
                name=""
                id="completed"
                onChange={() => {
                  setCompleted(!completed);
                }}
              />{" "}
              <label htmlFor="completed">Completed✔️</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="pending"
                onChange={() => {
                  setPending(!pending);
                }}
              />{" "}
              <label htmlFor="pending">Pending✔️</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
