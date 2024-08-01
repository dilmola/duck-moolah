import "@/styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ViewProvider } from "@/context/viewContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider enableSystem={false} defaultTheme="light">
        <ViewProvider>
          <Head>
            <title>Bill List</title>
          </Head>
          <Component {...pageProps} />
        </ViewProvider>
      </ThemeProvider>
    </>
  );
}
