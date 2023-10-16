import React, { PropsWithChildren } from "react";
import { Header } from "../header/header.component";
import Footer from "../footer/footer.component";
import { useUploadContext } from "@/context/files.context";

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
