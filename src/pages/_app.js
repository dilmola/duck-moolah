import "@/styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "@/context/globalContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider enableSystem={false} defaultTheme="light">
        <GlobalProvider>
          <Head>
            <title>Duck Moolah</title>
          </Head>
          <Component {...pageProps} />
        </GlobalProvider>
      </ThemeProvider>
    </>
  );
}
