import React, { useState } from "react";
import styles from "./editPdf.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectUngroup } from "@fortawesome/free-regular-svg-icons";
import PDFProvider from "../../components/pdfViewer/pdfViewer.component";
import { useUploadContext } from "@/context/files.context";
import { useRouter } from "next/router";
const EditPdf = () => {
  let [fontSize, setFontSize] = useState<number>(12);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const handleIncrease = (): void => {
    setFontSize(fontSize + 1);
  };
  const handleDecrease = (): void => {
    setFontSize(fontSize - 1);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(+e.target.value);
  };
  const onSelectionClick = (): void => {
    setIsSelecting(!isSelecting);
  };
  const { isSelected } = useUploadContext();
  const router = useRouter();
  const handleNext = () => {
    router.push("/confirm-changes");
  };
  return (
    <>
      <div style={{ borderRadius: " 3px", border: "1px solid #E7E7E7" }}>
        <div className={styles.toolsBar}>
          <button
            onClick={onSelectionClick}
            className={`${styles.dragSelection} ${
              isSelecting && styles.active
            }`}
          >
            Select Area <FontAwesomeIcon icon={faObjectUngroup} />
          </button>
          <select
            name="Select Font"
            id="font_selector"
            className={styles.fontSelection}
          >
            <option value="Sans Pro">Sans Pro</option>
            <option value="Fira Code">Fira Code</option>
          </select>
          <div className={styles.fontSizeProvider}>
            <button onClick={handleIncrease}>+</button>
            <input
              type="number"
              value={fontSize}
              onChange={handleInputChange}
            />
            <button onClick={handleDecrease}>-</button>
          </div>
          <div className={styles.colorPicker}>
            <input type="color" id="colorPicker"></input>
          </div>
          {isSelected && (
            <button className={styles.next_button} onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
      <PDFProvider selectMode={isSelecting} />
    </>
  );
};

export default EditPdf;
