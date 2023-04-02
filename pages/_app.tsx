import RootLayout from "@/components/layout/RootLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "pretendard/dist/web/variable/pretendardvariable.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Head>
        <title>seeyoujeong</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </RootLayout>
  );
}
