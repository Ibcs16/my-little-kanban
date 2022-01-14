// You are also able to use a 3rd party theme this way:
import "@emotion/react";
import { ThemeType } from "../styles/theme";

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
