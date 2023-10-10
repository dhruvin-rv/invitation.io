import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <header className={`${styles.main_header} container_main`}>
      <FontAwesomeIcon icon={faBars} className={styles.menu_icon} />
      <nav className={styles.nav}>
        <ul className={styles.left_menu}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/upload-file">Upload Card</Link>
          </li>
          <li>
            <Link href="/about-us">About</Link>
          </li>
          <li>
            <Link href="#">Contact US</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
