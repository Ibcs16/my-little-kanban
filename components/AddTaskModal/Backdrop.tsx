import React from "react";
import { motion } from "framer-motion";
// import { Container } from './styles';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface BackdropProps {
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClose }) => {
  return (
    <motion.div
      onClick={onClose}
      className="modal-backdrop"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
