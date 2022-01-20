import React from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import Button from "../Button";
import Input from "../Input";
import { useAppDispatch } from "../../app/hooks";
import { addTodo } from "../../features/todos/todosSlice";

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
}

const Content: React.FC<ContentProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(addTodo(e.target.new_task?.value));
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
        <label htmlFor="new_song">{"What's next? 😎"}</label>
        <Input name="new_task" id="new_task" placeholder="Enter task name" />
        <Button
          whileHover={{ scale: 1.05 }}
          type="submit"
          label="Add task"
          icon="plus"
        />
      </motion.form>
    </Backdrop>
  );
};

export default Content;
