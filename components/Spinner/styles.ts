import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

interface ContainerProps {
  size: "sm" | "md" | "lg";
}

interface SizeStyle {
  [key: string]: {
    container: any;
    item: {
      width: string;
      spaceDiff: number;
      left: string;
      heightMin: string;
      heightMax: string;
    };
  };
}

const sizeStyles: SizeStyle = {
  sm: {
    container: css`
      width: 20px;
      height: 20px;
    `,
    item: {
      width: "4px",
      spaceDiff: 3,
      left: "4px",
      heightMin: "8px",
      heightMax: "16px",
    },
  },
  lg: {
    container: css`
      width: 80px;
      height: 80px;
    `,
    item: {
      width: "8px",
      spaceDiff: 1,
      left: "4px",
      heightMin: "32px",
      heightMax: "64px",
    },
  },
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .lds-facebook {
    display: inline-block;
    position: relative;
    ${props => sizeStyles[props.size].container}
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    width: ${props => sizeStyles[props.size].item.width};
    left: ${props => sizeStyles[props.size].item.left};
    background: ${({ theme }) => theme.colors.primary};
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    margin-top: -12px;
  }
  .lds-facebook div:nth-child(1) {
    left: calc(12px / ${props => sizeStyles[props.size].item.spaceDiff});
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: calc(28px / ${props => sizeStyles[props.size].item.spaceDiff});
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: calc(44px / ${props => sizeStyles[props.size].item.spaceDiff});
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: ${props => sizeStyles[props.size].item.heightMax};
    }
    50%,
    100% {
      top: 24px;
      height: ${props => sizeStyles[props.size].item.heightMin};
    }
  }
`;
