import Image from "next/image";
import React from "react";
import playStoreLogo from "../../../public/images/play_store_logo.svg";
import appStoreLogo from "../../../public/images/app_store_logo.svg";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer_main}>
          <div className={styles.footer_main_first}>
            <h2>Invitation AI</h2>
            <p>
              Our Web PDF Editor is a powerful online tool designed to simplify
              your document management and editing tasks.
            </p>
            <a href="/about-us">Read More</a>
          </div>
          <div className={styles.footer_main_sec}>
            <h2>GET THE FREE APP</h2>
            <div className={styles.footer_main_img}>
              <Image
                src={appStoreLogo}
                style={{ height: "100%" }}
                alt="lux ecards app store download link"
              />
              <Image
                src={playStoreLogo}
                style={{ height: "100%" }}
                alt="lux ecards play store download link"
              />
            </div>
          </div>
        </div>
        <div className={styles.footer_sec}>
          <p>© 2023 invitation ai, Inc.</p>
          <div>
            <a href="#">Privacy Policy</a>
            <span> | </span>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
