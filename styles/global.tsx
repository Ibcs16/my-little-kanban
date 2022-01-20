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

  input {
    accent-color: ${theme.colors.primary};
  }

  main {
    h1 {
      margin-bottom: ;
    }
  }

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: clamp(540px, 540px, 90%);
    padding: 45px 67px;
    background: white;

    border-radius: 20px;

    border: 2px solid transparent;

    label {
      ${theme.typography.md.headingLg}
      margin-bottom: 20px;
    }
  }

  .modal-backdrop {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    height: 100%;
    z-index: 9999;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const GlobalStyle = () => {
  const theme = useTheme();
  return <Global styles={globalStyles(theme)} />;
};

export default GlobalStyle;
