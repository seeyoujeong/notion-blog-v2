import RootLayout from "@/components/layout/RootLayout";
import type { AppProps } from "next/app";
import Head from "next/head";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

import "pretendard/dist/web/variable/pretendardvariable.css";
import "@/styles/globals.css";
import "@/styles/notionStyle.scss";

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
