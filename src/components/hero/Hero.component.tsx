import Image from "next/image";
import React from "react";
import HeroFloral from "../../../public/images/hero_florals.png";
import styles from "./hero.module.css";
import ButtonSvg from "../../../public/images/hero_button_svg.svg";
import heroDots from "../../../public/images/hero_dots.png";
import CountUp from "react-countup";
const Hero = () => {
  return (
    <>
      <div className={styles.hero_main}>
        <div className={`${styles.hero_first}`}>
          <h2>Invitation AI</h2>
          <p>PDF Editor</p>
          <h1>Create a Pdf file of the cards with name of your guest.</h1>
          <p>
            Make custom cards for free with the online Card Maker tool. Whatever
            the occasion, mark it with the personal touch.
          </p>
          <button
            style={{
              position: "relative",
              color: "#FFF",
              textAlign: "center",
              border: "none",
              background: "none",
              cursor: "pointer",
              marginTop: "25px",
            }}
          >
            <Image src={ButtonSvg} alt="blue button svg" />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontFamily: "Roboto",
                fontSize: "15px",
              }}
            >
              Get Started
            </span>
          </button>
          <div className={styles.counter_main}>
            <div className={styles.counter}>
              <Image
                src={heroDots}
                style={{ width: "80%", height: "80%" }}
                alt="hero button background image"
              />
              <p>
                <CountUp end={2100} start={0} suffix="+" />
                <br /> Users
              </p>
            </div>
            <div className={styles.counter}>
              <Image
                alt="hero button background image"
                src={heroDots}
                style={{
                  width: "60%",
                  height: "60%",
                }}
              />
              <p>
                <CountUp end={1.1} start={0} suffix="M" decimals={2} />
                <br />
                PDFs Generated
              </p>
            </div>
          </div>
        </div>
        <div >
          <Image
            src={HeroFloral}
            style={{
              height: "100%",
              width: "100%",
            }}
            alt="hero section floral invitation card image"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
