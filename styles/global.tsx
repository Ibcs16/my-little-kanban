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
  #root {
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
`;

const GlobalStyle = () => {
  const theme = useTheme();
  return <Global styles={globalStyles(theme)} />;
};

export default GlobalStyle;
