import { css, Global, Theme, useTheme } from "@emotion/react";

const globalStyles = (theme: Theme) => css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #__next,
  main {
    width: 100%;
    height: 100%;
  }

  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    font-family: Roboto, san-serif;
    -webkit-font-smoothing: antialiased !important;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  #__next {
    display: grid;
    grid-template-columns: 90px auto;
    grid-template-rows: 1fr;
    gap-column: 20px;
    grid-auto-flow: row;

    grid-template-areas: "header content";
  }

  #content {
    grid-area: content;
    padding: 40px 32px 24px 55px;
  }
`;

const GlobalStyle = () => {
  const theme = useTheme();
  return <Global styles={globalStyles(theme)} />;
};

export default GlobalStyle;
