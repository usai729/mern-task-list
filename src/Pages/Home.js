import React, { useEffect } from "react";
import TaskCard from "../Components/TaskCard";
import Container from "../Components/Container";
import SortBar from "../Components/SortBar";
import EditModal from "../Components/EditModal";

import { FaDoorOpen, FaGithub, FaLinkedin, FaPlus } from "react-icons/fa";
import { useState } from "react";
import New from "../Components/New";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { tokenAction } from "../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { getTodos } from "../Redux/Functions/TodoFunc";

export default function Home() {
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [sortCompleted, setSortCompleted] = useState(false);
  const [sortPending, setSortPending] = useState(false);
  var rept = [];

  const dispatch = useDispatch();
  const { todos, loading, errors } = useSelector((state) => state.todos);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <>
      <Container>
        <div className="justify-center items-center flex m-10">
          <div className="flex flex-col w-screen md:w-10/12 p-4">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-roboto font-bold">📝Task List</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setOpenNewTaskModal(!openNewTaskModal);
                  }}
                  className={`${
                    openNewTaskModal ? "rotate-45" : "rotate-0"
                  } transition-all duration-200 ease-linear`}
                >
                  <FaPlus />
                </button>
                <button
                  onClick={async () => {
                    console.log("hi");

                    localStorage.removeItem("token");
                    await dispatch(tokenAction(null));

                    navigate("/auth");
                  }}
                >
                  <MdLogout />
                </button>
                <a
                  href="http://www.linkedin.com/in/saiuttarkar"
                  target="_blank"
                >
                  <FaLinkedin size={22} color="#0077B5" />
                </a>
                <a href="http://www.github.com/usai729" target="_blank">
                  <FaGithub size={22} />
                </a>
              </div>
            </div>
            <SortBar
              pending={sortPending}
              setPending={setSortPending}
              completed={sortCompleted}
              setCompleted={setSortCompleted}
            />
            <div className="flex flex-wrap gap-5 justify-center mt-10">
              {todos?.map((ele) => {
                var date = new Date(ele.added);
                var added =
                  date.toString().split(" ")[2] +
                  " " +
                  date.toString().split(" ")[1];

                if (sortCompleted) {
                  if (!rept.includes(ele._id) && ele.completed) {
                    return (
                      <TaskCard
                        key={ele._id}
                        id={ele?._id}
                        title={ele.todoTitle}
                        priority={ele.priority}
                        completed={ele.completed}
                        desc={ele.todoDesc}
                        date={added}
                      />
                    );
                  }
                } else if (sortPending) {
                  if (!rept.includes(ele._id) && !ele.completed) {
                    return (
                      <TaskCard
                        key={ele.id}
                        id={ele?._id}
                        title={ele.todoTitle}
                        priority={ele.priority}
                        completed={ele.completed}
                        desc={ele.todoDesc}
                        date={added}
                      />
                    );
                  }
                } else {
                  if (!rept.includes(ele._id)) {
                    return (
                      <TaskCard
                        key={ele.id}
                        id={ele?._id}
                        title={ele.todoTitle}
                        priority={ele.priority}
                        completed={ele.completed}
                        desc={ele.todoDesc}
                        date={added}
                      />
                    );
                  }
                }
                rept.push(ele._id);

                return null;
              })}
            </div>
          </div>
          <div
            className={`${
              openNewTaskModal ? "fixed" : "hidden"
            } right-6/3 left-6/3 backdrop-blur-lg`}
          >
            <New val={openNewTaskModal} func={setOpenNewTaskModal} />
          </div>
        </div>
      </Container>
    </>
  );
}
