import React from "react";
import { TypographyProps } from "../Typography/styles";

import { StyledTypography } from "./styles";

const BoardTitle: React.FC = ({ children, ...others }) => {
  return (
    <StyledTypography variants={{ md: "headingLg" }} {...others}>
      {children}
    </StyledTypography>
  );
};

export default BoardTitle;
