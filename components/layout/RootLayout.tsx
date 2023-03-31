import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
