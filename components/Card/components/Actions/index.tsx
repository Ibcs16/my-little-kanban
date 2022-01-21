import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useCycle,
} from "framer-motion";
import React, { useCallback } from "react";
import Icon from "../../../Icon";
import Spinner from "../../../Spinner";

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

interface ActionsProps {
  onOpenEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  loading?: boolean;
}

const Actions: React.FC<ActionsProps> = ({
  loading,
  onOpenEdit,
  onDelete,
  onClose,
}) => {
  const [showActions, toggleActions] = useCycle(false, true);

  const handleCloseOptions = useCallback(() => {
    if (showActions) {
      onClose();
    }
    toggleActions();
  }, [onClose, showActions, toggleActions]);

  if (loading) {
    return (
      <div className="actionsMenu">
        <Spinner size="sm" />
      </div>
    );
  }
  return (
    <Container className="actionsMenu" data-testid="options-menu">
      <AnimatePresence exitBeforeEnter initial={false}>
        {showActions && (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="actions"
            data-testid="actions"
          >
            <motion.button
              variants={itemAnimation}
              initial="hidden"
              animate="show"
              onClick={onOpenEdit}
            >
              <Icon size={18} name="edit" />
            </motion.button>
            <motion.button
              variants={itemAnimation}
              initial="hidden"
              animate="show"
              onClick={onDelete}
            >
              <Icon size={18} name="delete" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        id="menu-button"
        data-testid="menu-btn"
        onClick={handleCloseOptions}
      >
        <Icon size={18} name={showActions ? "close" : "moreV"} />
      </button>
    </Container>
  );
};

export default Actions;
