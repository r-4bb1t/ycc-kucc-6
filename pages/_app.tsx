import "styles/taiwindcss.css";
import "styles/globals.css";
import { useEffect } from "react";
import getConfig from "next/config";
import type { AppProps } from "next/app";
import AlertContextProvider from "contexts/AlertContext";
import UnivContextProvider from "contexts/UnivContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <AlertContextProvider>
      <UnivContextProvider>
        <Component {...pageProps} />
      </UnivContextProvider>
    </AlertContextProvider>
  );
}

export default MyApp;
