import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageHead from "./PageHead";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageHead />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
