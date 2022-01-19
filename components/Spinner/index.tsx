import { motion } from "framer-motion";
import React from "react";

import { Container } from "./styles";

const yAnimation = [10, 30];

const animations = {
  1: {
    height: yAnimation,
    transition: {
      height: {
        // yoyo: Infinity,
        type: "easeOut",
      },
    },
  },
  2: {
    height: yAnimation,
    transition: {
      height: {
        // yoyo: Infinity,
        delay: 0.5,
      },
    },
  },
  3: {
    height: yAnimation,
    transition: {
      height: {
        // yoyo: Infinity,
        delay: 0.75,
      },
    },
  },
};

const Spinner: React.FC = () => {
  return (
    <Container>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default Spinner;
