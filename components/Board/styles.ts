import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 30px 0px 30px;
  grid-area: board;
  overflow-x: auto;
  overflow-y: auto;
  grid-template-columns: repeat(3, 288px);
  grid-template-rows: 100%;
  gap: 18px;

  ${props => props.theme.media.md} {
    grid-template-columns: repeat(3, 320px);
    gap: 24px;
  }

  &::after {
    content: "";
    width: 1px;
  }
`;
