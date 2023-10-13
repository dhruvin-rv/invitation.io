import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/images/INVITATION AI.svg";
import Image from "next/image";
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
        <Link href="/"> 
       <Image src={logo} alt="logo"/>
        </Link>
      </div>
      <div className={styles["menu-icon"]} onClick={handleShowNavbar}>
        <FontAwesomeIcon icon={showNavbar ? faXmark:faBars  } />
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
