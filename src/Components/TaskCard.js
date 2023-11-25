import React, { useState } from "react";
import PropTypes from "prop-types";

import { TiDelete, TiEdit, TiTick } from "react-icons/ti";
import EditModal from "./EditModal";
import { useDispatch } from "react-redux";
import { updateTodo } from "../Redux/Functions/TodoFunc";

function TaskCard({ title, date, priority, desc, completed, id }) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`w-screen md:w-[16rem] p-2 flex flex-col border-1-5 border-gray-300 backdrop-blur-md shadow-md rounded-md ${
          completed ? "f grayscale" : "blur-none"
        }`}
      >
        <p className="text-md font-bold font-poppins">{title}</p>
        <div className="flex w-max gap-2 mt-1 mb-1">
          <p
            className={`text-xs font-extrabold font-poppins ${
              priority === "High🔥"
                ? "bg-red-300"
                : priority === "Low❄️"
                ? "bg-green-300"
                : "bg-gray-300"
            } backdrop-blur-sm w-max p-1 rounded-sm`}
          >
            {priority}
          </p>
          <p
            className={`text-xs font-extrabold font-poppins ${
              completed ? "bg-green-300" : "bg-gray-300"
            } backdrop-blur-sm w-max p-1 rounded-sm`}
          >
            {completed ? "Completed ✔️" : "Pending ⏳"}
          </p>
        </div>
        <span className="border-1-5 border-gray-500 w-full mt-2 mb-2"></span>
        <p className="text-sm font-roboto">{desc}</p>
        <div className="flex justify-evenly mt-2 mb-2 gap-2">
          <form
            className="w-full"
            onSubmit={() => {
              dispatch(
                updateTodo({
                  type: "COMPLETE",
                  id: id,
                })
              );
            }}
          >
            <button
              className="border-green-600 border-b-1 hover:border-1 rounded-sm items-center w-full flex justify-center p-2"
              style={{
                cursor: completed ? "not-allowed" : "pointer",
              }}
            >
              <TiTick size={20} className="text-green-600" />
            </button>
          </form>
          <button
            className="border-gray-600 border-b-1 hover:border-1 rounded-sm items-center w-full flex justify-center p-2"
            onClick={() => {
              if (!completed) {
                setOpenEditModal(!openEditModal);
              }
            }}
            style={{
              cursor: completed ? "not-allowed" : "pointer",
            }}
          >
            <TiEdit size={20} className="text-gray-600" />
          </button>
          <form
            action={`http://localhost:3001/todos/delete/${id}`}
            className="w-full flex"
          >
            <button
              type="submit"
              className="border-red-600 border-b-1 hover:border-1 rounded-sm items-center w-full flex justify-center p-2"
              style={{
                cursor: completed ? "not-allowed" : "pointer",
              }}
              x
            >
              <TiDelete className="text-red-70" size={20} />
            </button>
          </form>
        </div>
        <p className="text-xs text-right">{date}</p>
      </div>
      <div
        className={`${
          openEditModal ? "fixed" : "hidden"
        } right-6/3 left-6/3 backdrop-blur-lg z-50`}
      >
        <EditModal
          val={openEditModal}
          func={setOpenEditModal}
          priority={priority}
          desc={desc}
          title={title}
          id={id}
        />
      </div>
    </>
  );
}

TaskCard.propTypes = {};

export default TaskCard;
