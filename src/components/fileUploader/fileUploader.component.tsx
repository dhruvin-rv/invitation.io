import React, { useState, ReactNode } from "react";
import styles from "./fileUploader.module.css";

interface FilesDragAndDropProps {
  onUpload: (file: any) => void;
  onContinue: () => void;
  children: ReactNode;
}
const FileUpload: React.FC<FilesDragAndDropProps & { buttonText: string }> = ({
  onUpload,
  onContinue,
  children,
  buttonText,
}) => {
  const [dragging, setDragging] = React.useState<boolean>(false);
  const [fileSelected, setFileSelected] = React.useState<string>("");
  const drop = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    drop.current?.addEventListener("dragover", handleDragOver as any);
    drop.current?.addEventListener("drop", handleDrop as any);
    drop.current?.addEventListener("dragenter", handleDragEnter as any);
    drop.current?.addEventListener("dragleave", handleDragLeave as any);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver as any);
      drop.current?.removeEventListener("drop", handleDrop as any);
      drop.current?.removeEventListener("dragenter", handleDragEnter as any);
      drop.current?.removeEventListener("dragleave", handleDragLeave as any);
    };
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const { files } = e.dataTransfer;
    if (files && files.length) {
      setFileSelected(files[0].name);
      onUpload(files);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };
  const handleButtonClick = () => {
    // Trigger the click event of the file input element
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };
  const handleButtonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handle button event triggered");
    const { files } = e.target;
    console.log(files);
    if (files && files.length) {
      setFileSelected(files[0].name);
      onUpload(files);
    }
  };

  return (
    <>
      <div
        className={`${styles.uploadProvider} ${
          dragging ? styles.dragover : ""
        }`}
        ref={drop}
      >
        {children}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleButtonUpload(e)
          }
        />
        <div className={styles.buttonDiv}>
          <button className={styles.uploadButton} onClick={handleButtonClick}>
            {buttonText}
          </button>
          {fileSelected.length > 0 && (
            <button className={styles.continueButton} onClick={onContinue}>
              →
            </button>
          )}
        </div>
        {fileSelected.length ? (
          <p style={{ marginBottom: "0px", color: "green" }}>{fileSelected}</p>
        ) : (
          <p style={{ marginBottom: "0px", color: "black" }}>
            No File Selected
          </p>
        )}
      </div>
    </>
  );
};

export default FileUpload;
