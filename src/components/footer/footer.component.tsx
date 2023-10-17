import Image from "next/image";
import React from "react";
import playStoreLogo from "../../../public/images/play_store_logo.svg";
import appStoreLogo from "../../../public/images/app_store_logo.svg";
import styles from "./footer.module.css";
import Link from "next/link";
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
            <Link href="/about-us">Read More</Link>
          </div>
          <div className={styles.footer_main_sec}>
            <h2>GET THE FREE APP</h2>
            <div className={styles.footer_main_img}>
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.luxecard.app"
                }
                target="_blank"
              >
                <Image
                  src={appStoreLogo}
                  style={{ height: "100%" }}
                  alt="lux ecards app store download link"
                />
              </Link>
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.luxecard.app"
                }
                target="_blank"
              >
                <Image
                  src={playStoreLogo}
                  style={{ height: "100%" }}
                  alt="lux ecards play store download link"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.footer_sec}>
          <p>© 2023 invitation ai, Inc.</p>
          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span> | </span>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
