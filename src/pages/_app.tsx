import RootLayout from "@/components/layout/Layout.component";
import { UploadProvider } from "@/context/files.context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UploadProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </UploadProvider>
  );
}
