import { StyledComponent } from "@emotion/styled";
import React from "react";

import { Text, TypographyProps } from "./styles";

const Typography: React.FC<TypographyProps> = ({ children, ...others }) => {
  return <Text {...others}>{children}</Text>;
};

export default Typography;
