import styled from "@emotion/styled";
import Typography from "../Typography";

export const StyledTypography = styled(Typography)`
  width: 100%;
  ${({ theme }) => theme.media.md} {
    max-width: 364px;
  }
  color: ${props => props.theme.colors.textSecondary};
`;
