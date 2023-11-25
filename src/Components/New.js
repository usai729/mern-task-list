import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

import { useDispatch } from "react-redux";
import { newtodo } from "../Redux/Functions/TodoFunc";
import { useNavigate } from "react-router-dom";

export default function New({ val, func }) {
  const [priority, setPriority] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center shadow-md w-screen md:w-[26vw]">
      <div className="flex flex-col bg-white p-4 w-full">
        <div className="flex justify-end items-center gap-3">
          <p className="text-xl font-bold text-right text-blue-600">New</p>
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
          onSubmit={() => {
            dispatch(
              newtodo({
                title: title,
                desc: desc,
                priority: priority,
              })
            );

            navigate(0);
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
          >
            <option value="" selected disabled>
              Select Priority
            </option>
            <option value="High🔥">High🔥</option>
            <option value="Mid🤏">Mid🤏</option>
            <option value="Low❄️">Low❄️</option>
          </select>
          <input
            type="text"
            placeholder="Title.."
            name=""
            id=""
            className="border-none shadow-md outline-none p-3 m-2"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <textarea
            type="text"
            placeholder="Description.."
            name=""
            id=""
            onChange={(e) => {
              setDesc(e.target.value);
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
