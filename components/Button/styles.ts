import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 16px 12px;
  border-radius: 4px;
  ${props => props.theme.typography.md.paragraphMdBold}
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${props => props.theme.colors.primary};
  color: white;
  svg {
    color: white;
  }
  max-height: 51px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
