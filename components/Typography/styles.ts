import styled from "@emotion/styled";

export interface TypographyProps {
  variants: {
    sm?: string;
    md?: string;
  };
}

export const Text = styled.p<TypographyProps>`
  ${({ theme, variants }) => theme.typography.md[variants.md || "paragraphMd"]}
`;
