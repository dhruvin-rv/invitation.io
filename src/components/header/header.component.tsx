import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
export const Header = () => {
  return (
    <header className={`${styles.main_header} container_main`}>
      <nav className={styles.left_menu}>
        <ul>
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
      <nav className={styles.right_menu}>
        <ul>
          <li>
            <button className={styles.signup_button}>
              <Link href="#">SignUp</Link>
            </button>
          </li>
          <li>
            <button className={styles.signin_button}>
              <Link href="#">SignIn</Link>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
