import styled from "@emotion/styled";
import React from "react";

export const styledIcon = (Element: React.ComponentClass) => styled(Element)`
  color: ${props => props.theme.colors.textSecondary};
`;
