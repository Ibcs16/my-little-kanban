import React from "react";
import { AnimatePresence } from "framer-motion";
import Content from "./Content";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<ModalProps> = ({ visible, ...others }) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {visible && <Content {...others} />}
    </AnimatePresence>
  );
};

export default AddTaskModal;
