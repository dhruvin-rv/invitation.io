import { Header } from "@/components/header/header.component";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "./about.module.css";
import aboutUsImt from "../../../public/images/aboutUs.png";
const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us - Invitation Io</title>
      </Head>
      <main>
        <div className={`${styles.about_us_img} container_main`}>
          <Image
            src={aboutUsImt}
            style={{
              width: "50%",
              height: "auto",
            }}
            alt="invitation ai about us banner"
          />
        </div>
        <div className={`${styles.about_us_content} container_main`}>
          <h1>Hello We are</h1>
          <h2>Building PDF Tools</h2>
          <p>
            At [PDF Editor Website Name], we are passionate about providing you
            with the tools and resources to unlock the full potential of your
            PDF documents. Our mission is to empower individuals and businesses
            to efficiently manage and manipulate their PDF files with ease.
          </p>
          <p>
            With [X] years of experience in the industry, we have established
            ourselves as a leading provider of innovative PDF editing solutions.
            Our team of skilled professionals is dedicated to delivering
            high-quality software that meets the ever-evolving needs of our
            users.
          </p>
          <p>
            We understand the challenges that come with working with
            PDFs—whether it&apos;s editing text, rearranging pages, adding
            annotations, or merging multiple files. That&apos;s why we have
            developed a user-friendly and feature-rich PDF editor that
            simplifies these tasks and saves you valuable time.
          </p>
        </div>
      </main>
    </>
  );
};

export default AboutUs;
