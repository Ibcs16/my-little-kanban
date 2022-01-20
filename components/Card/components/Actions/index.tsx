import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useCycle,
} from "framer-motion";
import React from "react";
import Icon from "../../../Icon";

import { Container } from "./styles";

const containerAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
};

const itemAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Actions: React.FC = () => {
  const [showActions, toggleActions] = useCycle(false, true);
  return (
    <Container className="actionsMenu">
      <AnimatePresence exitBeforeEnter initial={false}>
        {showActions && (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="actions"
          >
            <motion.button
              variants={itemAnimation}
              initial="hidden"
              animate="show"
            >
              <Icon size={18} name="edit" />
            </motion.button>
            <motion.button
              variants={itemAnimation}
              initial="hidden"
              animate="show"
            >
              <Icon size={18} name="delete" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <button id="menu-button" onClick={() => toggleActions()}>
        <Icon size={18} name={showActions ? "close" : "moreV"} />
      </button>
    </Container>
  );
};

export default Actions;
