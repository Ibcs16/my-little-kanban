import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 16px;
  border-radius: 4px;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.opaque};
  cursor: grab;

  font-weight: 500;
`;
