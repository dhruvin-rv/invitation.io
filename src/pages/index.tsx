import Head from "next/head";
import Hero from "@/components/hero/Hero.component";
import HIW from "@/components/howItWork/HowItWork.component";
import Script from "next/script";


export default function Home() {
  return (
    <>
     
      <Head>
        <meta charSet='UTF-8' />
        <title>Bulk Write Guest Name on PDF Invitation Card</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow"></meta>
        <meta name="author" content="Invitation.io"></meta>
        <meta name="google-adsense-account" content="ca-pub-7681955138987568" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <HIW />
    </>
  );
}
