import React, { useState } from "react";
import styles from "./editPdf.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectUngroup } from "@fortawesome/free-regular-svg-icons";
import PDFProvider from "../../components/pdfViewer/pdfViewer.component";
const EditPdf = () => {
  let [fontSize, setFontSize] = useState<number>(12);
  const handleIncrease = (): void => {
    setFontSize(fontSize + 1);
  };
  const handleDecrease = (): void => {
    setFontSize(fontSize - 1);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(+e.target.value);
  };
  const handleAreaSelected = (x, y) => {
    // Do something with the selected area's x and y positions
    console.log("Selected area position:", x, y);
  };

  return (
    <>
      <div style={{ borderRadius: " 3px", border: "1px solid #E7E7E7" }}>
        <div className={styles.toolsBar}>
          <button className={styles.dragSelection}>
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
        </div>
      </div>
      <PDFProvider onAreaSelected={handleAreaSelected} />
    </>
  );
};

export default EditPdf;
