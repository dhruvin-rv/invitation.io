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
  }
  return (
    <nav className={styles.navbar}>
    <div className={styles.container}>
      <div className={styles.logo}>
       BIG LOGO
      </div>
      <div className={styles["menu-icon"]} onClick={handleShowNavbar}>
        <FontAwesomeIcon icon={faHamburger} />
      </div>
      <div className={`${styles["nav-elements"]}  ${showNavbar && styles.active}}`}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};
