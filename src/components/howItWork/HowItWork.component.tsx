import Image from "next/image";
import React from "react";
import SubHomeF1 from "../../../public/images/Subtract_home_f1.svg";
import styles from "./hiw.module.css";
import uploadCardSvg from "../../../public/images/upload_card_svg.svg";
import uploadSheetSvg from "../../../public/images/upload_sheet_svg.svg";
import selectAreaSvg from "../../../public/images/upload_sheet_svg.svg";
import downloadPdfSvg from "../../../public/images/download_file_svg.svg";
const HIW = () => {
  return (
    <>
      <Image src={SubHomeF1} style={{ width: "100%" }} alt="blue shape" />
      <div className={styles.hiw_main}>
        <h1>How It Works?</h1>
        <p>
          Complete your card with the right paper finish on your choice of
          eco-friendly,high-quality paper stock.
        </p>
      </div>
      <div className={`${styles.hiw_guide} container_main`}>
        <div className={styles.hiw_step}>
          <Image src={uploadCardSvg} alt="" style={{ width: "90%" }} />
        </div>
        <div className={`${styles.hiw_step} ${styles.hiw_item}`}>
          <h2>Upload The Card</h2>
          <p>
            Upload card from the upload card page. You can drag and drop the PDF
            file or click on the upload button to upload the file.
          </p>
        </div>
        <div className={`${styles.hiw_step} ${styles.hiw_item}`}>
          <h2>Upload the CSV File</h2>
          <p>
            To acquire a PDF file containing custom names on cards, please
            upload a CSV file. This CSV should include columns for generating
            personalized PDFs and specifying the custom names for the downloaded
            files.
          </p>
        </div>
        <div className={`${styles.hiw_step} ${styles.hiw_item}`}>
          <Image src={uploadSheetSvg} alt="" style={{ width: "90%" }} />
        </div>
        <div className={`${styles.hiw_step} ${styles.hiw_item}`}>
          <Image src={selectAreaSvg} alt="" style={{ width: "90%" }} />
        </div>
        <div className={`${styles.hiw_step} ${styles.hiw_item}`}>
          <h2>Select area on the card from the PDF viewer to write text on</h2>
          <p>
            You will need to select the area on the card where you want to write
            the text of the rows of particular columns of the CSV file. You can
            select multiple areas on the card to write the text on.
          </p>
        </div>
        <div className={`${styles.hiw_step} ${styles.hiw_item}`}>
          <h2>Download PDFs file </h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className={`${styles.hiw_step} ${styles.hiw_item}`}>
          <Image src={downloadPdfSvg} alt="" style={{ width: "90%" }} />
        </div>
      </div>
    </>
  );
};

export default HIW;
