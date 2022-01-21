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
    width: 100%;
    // height: 100%;
    overflow-x: hidden;
    display: grid;
    gap-row: 28px;
    grid-auto-flow: fit-content;
    grid-template-rows: 52px auto;
    grid-template-columns: 1fr;

    grid-template-areas:
      "header"
      "content";

    ${theme.media.md} {
      grid-template-areas: "header content";
      grid-auto-flow: row;
      gap-column: 20px;
      grid-template-columns: 90px auto;
      grid-template-rows: 1fr;
    }
  }

  #content {
    width: 100vw;

    grid-area: content;
    padding: 26px 0px 26px 26px;

    ${theme.media.lg} {
      padding: 40px 32px 24px 55px;
    }
  }

  .searchWrapper {
    display: flex;
    gap: 5px;
    width: 100%;
    padding-right: 26px;

    ${theme.media.lg} {
      gap: 18px;
      width: fit-content;
      margin-right: 42px;
    }
  }

  .boardInfoWrapper {
    flex: 1;
    padding-right: 26px;
    ${theme.media.lg} {
      padding-right: 32px;
    }
  }

  .boardHeader {
    display: flex;
    gap: 28px;
    justify-content: space-between;
    flex-direction: column;
    ${theme.media.lg} {
      gap: 0px;
      flex-direction: row;
    }
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
    width: clamp(520px, 520px, 90%);
    padding: 45px 67px;
    background: white;

    border-radius: 20px;

    border: 2px solid transparent;

    label {
      ${theme.typography.md.headingLg}
      text-align: center;
      margin-bottom: 20px;
    }
  }

  .modal-backdrop {
    position: fixed;
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
