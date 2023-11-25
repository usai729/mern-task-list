import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateTodo } from "../Redux/Functions/TodoFunc";

export default function EditModal({ val, func, title, desc, priority, id }) {
  const [newPriority, setPriority] = useState(priority);
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);

  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center shadow-xl w-screen md:w-[26vw] bg-white">
      <div className="flex flex-col bg-white p-4 w-full">
        <div className="flex justify-end items-center gap-3">
          <p className="text-xl font-bold text-right text-blue-600">Edit</p>
          <MdCancel
            className="cursor-pointer"
            size={20}
            onClick={() => {
              func(!val);
            }}
          />
        </div>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            dispatch(
              updateTodo({
                type: "REGULAR",
                title: newTitle,
                desc: newDesc,
                priority: newPriority,
                id: id,
              })
            );
          }}
        >
          <select
            name=""
            id=""
            className="outline-none border-2 border-gray-600 rounded-full p-2"
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            required
            value={priority}
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="High🔥">High🔥</option>
            <option value="Mid🤏">Mid🤏</option>
            <option value="Low❄️">Low❄️</option>
          </select>
          <input
            type="text"
            placeholder="New Title.."
            name=""
            id=""
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            className="border-none shadow-md outline-none p-3 m-2"
          />
          <textarea
            type="text"
            placeholder="New Description.."
            name=""
            id=""
            value={newDesc}
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
            className="border-none shadow-md outline-none p-3 m-2"
          />
          <button
            type="submit"
            className="p-2 m-2 border-none bg-blue-600 text-white hover:shadow-md font-semibold"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
