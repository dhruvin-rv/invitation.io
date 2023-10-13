import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [showNav, setShowNav] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)

  const toggleNavItems = () => {
    setShowNav(!showNav)
  }
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
    if (!showNavbar) {
      document.body.classList.add('navbar-open');
    } else {
      document.body.classList.remove('navbar-open');
    }
  }
  return (
    <nav className={styles.navbar}>
    <div className={styles.container}>
      <div className={styles.logo}>
       INVITATION AI
      </div>
      <div className={styles["menu-icon"]} onClick={handleShowNavbar}>
        <FontAwesomeIcon icon={faHamburger} />
      </div>
      <div className={`${styles["nav-elements"]}  ${showNavbar && styles.active}`}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
          <li>
            <Link href="/upload-file">Upload PDF</Link>
          </li>
          <li>
            <Link href="/Contact Us">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};
