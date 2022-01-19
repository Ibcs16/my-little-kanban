import React from "react";
import { TypographyProps } from "../Typography/styles";

import { StyledTypography } from "./styles";

const BoardDescription: React.FC = ({ children, ...others }) => {
  return (
    <StyledTypography variants={{ md: "paragraphMd" }} {...others}>
      {children}
    </StyledTypography>
  );
};

export default BoardDescription;
