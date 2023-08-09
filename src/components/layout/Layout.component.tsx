import React, { PropsWithChildren } from "react";
import { Header } from "../header/header.component";
import Footer from "../footer/footer.component";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;
