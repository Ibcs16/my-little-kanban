import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  padding: 30px 0px 30px;
  grid-area: board;
  overflow-x: auto;
  gap: 18px;

  ${props => props.theme.media.md} {
    gap: 24px;
  }

  &:after {
    content: "";
    width: 1px;
  }
`;
