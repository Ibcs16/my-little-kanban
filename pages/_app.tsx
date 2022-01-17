import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../app/store";
import Header from "../components/Header";
import GlobalStyle from "../styles/global";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
