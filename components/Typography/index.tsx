import { StyledComponent } from "@emotion/styled";
import React from "react";

import { Text } from "./styles";

const Typography: React.FC<StyledComponent<{}>> = ({ children, ...others }) => {
  return <Text {...others}>{children}</Text>;
};

export default Typography;
