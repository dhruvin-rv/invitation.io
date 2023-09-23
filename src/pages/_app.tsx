import "regenerator-runtime/runtime.js";
import RootLayout from "@/components/layout/Layout.component";
import { UploadProvider } from "@/context/files.context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UploadProvider>
      <RootLayout>
        <Component {...pageProps} />
        <ToastContainer />
      </RootLayout>
    </UploadProvider>
  );
}
