import React from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import Button from "../Button";
import Input from "../Input";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addTodo,
  selectCreateTodoApiStatus,
} from "../../features/todos/todosSlice";
import Spinner from "../Spinner";

const variants = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.2,
      type: "easeInOut",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: { y: "100vh" },
};

interface ContentProps {
  onClose: () => void;
  listStatus: string;
}

const statusTitleMapping: { [status: string]: string } = {
  todo: "What's next? 💭",
  doing: "What are you doing? 🔥",
  done: "What have you finished? ✅",
};

const Content: React.FC<ContentProps> = ({ onClose, listStatus }) => {
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectCreateTodoApiStatus);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(addTodo({ title: e.target.new_task?.value, status: listStatus }));
  };

  return (
    <Backdrop onClose={onClose}>
      <motion.form
        onSubmit={handleSubmit}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal"
        onClick={e => e.stopPropagation()}
      >
        {apiStatus === "loading" && <Spinner />}
        {apiStatus !== "loading" && (
          <>
            <label htmlFor="new_song">
              {statusTitleMapping[listStatus || "todo"]}
            </label>
            <Input
              name="new_task"
              id="new_task"
              placeholder="Enter task name"
            />
            <Button
              whileHover={{ scale: 1.05 }}
              type="submit"
              label="Add task"
              icon="plus"
            />
          </>
        )}
      </motion.form>
    </Backdrop>
  );
};

export default Content;
