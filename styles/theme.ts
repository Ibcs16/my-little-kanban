import { css } from "@emotion/react";

export const theme = {
  colors: {
    primary: "#E85A1E",
    secondary: "rgba(86, 60, 45, 0.08)",
    tertiary: "#E2BEAE",
    opaque: "rgba(230, 236, 245, .4)",
    text: "#333",
    textSecondary: "#616161",
    textTertiary: "#BFBFBF",
    bg: "white",
    bg01: "#F8F8F7",
    bg02: "#E5E5E5",
    divider: "rgba(0, 0, 0, 0.05)",
  },
  shadows: {
    sm: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  typography: {
    md: {
      headingLg: css`
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 37px;
      `,
      headingMd: css`
        font-family: Roboto;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
      `,
      paragraphMd: css`
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
      `,
      paragraphMdBold: css`
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
      `,
      extra: css`
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
      `,
      extraMd: css`
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
      `,
      input: css`
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
      `,
    },
    sm: {},
  },
};

export type ThemeType = typeof theme;

// export type ThemeType = typeof theme;
