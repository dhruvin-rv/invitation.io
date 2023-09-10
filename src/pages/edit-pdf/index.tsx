import React, { useState } from "react";
import styles from "./editPdf.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectUngroup } from "@fortawesome/free-regular-svg-icons";
import PDFProvider from "../../components/pdfViewer/pdfViewer.component";
import { useUploadContext } from "@/context/files.context";
import { useRouter } from "next/router";
import { FONTS } from "@/utils/fonts";
import { toast } from "react-toastify";
const EditPdf = () => {
  let [fontSize, setFontSize] = useState<number>(12);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const { isSelected, selections, setSelections } = useUploadContext();
  const handleIncrease = (): void => {
    setFontSize(fontSize + 1);
    setSelections((prev) => {
      const updatedSelection = {
        ...prev[prev.length - 1],
        font_size: fontSize + 1,
      };
      const final = [...prev];
      final[prev.length - 1] = updatedSelection;
      return final;
    });
  };
  const handleDecrease = (): void => {
    setFontSize(fontSize - 1);
    setSelections((prev) => {
      const updatedSelection = {
        ...prev[prev.length - 1],
        font_size: fontSize - 1,
      };
      const final = [...prev];
      final[prev.length - 1] = updatedSelection;
      return final;
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(+e.target.value);
    setSelections((prev) => {
      const updatedSelection = {
        ...prev[prev.length - 1],
        font_size: +e.target.value,
      };
      const final = [...prev];
      final[prev.length - 1] = updatedSelection;
      return final;
    });
  };
  const onSelectionClick = (): void => {
    setIsSelecting(!isSelecting);
  };
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelections((prev) => {
      const updatedSelection = {
        ...prev[prev.length - 1],
        font: event.target.value,
      };
      const final = [...prev];
      final[prev.length - 1] = updatedSelection;
      return final;
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelections((prev) => {
      const updatedSelection = {
        ...prev[prev.length - 1],
        font_color: event.target.value,
      };
      const final = [...prev];
      final[prev.length - 1] = updatedSelection;
      return final;
    });
  };

  const router = useRouter();
  const handleNext = () => {
    if (
      selections.length > 0 &&
      (!selections[selections.length - 1].font ||
        selections[selections.length - 1].font == "N/A")
    ) {
      return toast.error("Please select the font for last selection");
    }
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
            onChange={handleFontChange}
            className={styles.fontSelection}
            value={
              (selections.length && selections[selections.length - 1].font) ||
              ""
            }
          >
            <option value="N/A">Select Font</option>
            {FONTS.map((e, i) => (
              <option value={e.name} key={i}>
                {e.name}
              </option>
            ))}
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
            <input
              type="color"
              id="colorPicker"
              onChange={handleColorChange}
            ></input>
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
