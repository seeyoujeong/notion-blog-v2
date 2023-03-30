import { PropsWithChildren } from "react";
import Header from "./Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <div>footer</div>
    </>
  );
}

export default RootLayout;
