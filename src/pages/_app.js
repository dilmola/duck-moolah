import "@/styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "@/context/globalContext";
import { Nunito_Sans } from "next/font/google";

const Nunito_Sans_init = Nunito_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider enableSystem={false} defaultTheme="dark">
        <GlobalProvider>
          <Head>
            <title>Duck Moolah</title>
            <meta name="format-detection" content="telephone=no" />
          </Head>
          <div className={Nunito_Sans_init.className}>
            <Component {...pageProps} />
          </div>
        </GlobalProvider>
      </ThemeProvider>
    </>
  );
}
