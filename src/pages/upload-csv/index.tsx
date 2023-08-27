import FileUpload from "@/components/fileUploader/fileUploader.component";
import { useUploadContext } from "@/context/files.context";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
interface ColumnData {
  [key: string]: string;
}
const UploadCsv = () => {
  const router = useRouter();
  const { setCsvFile, setColumns, csvFile } = useUploadContext();
  const onUpload = (files: FileList) => {
    setCsvFile(files[0]);
  };

  useEffect(() => {
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text: any = e.target?.result;
        if (typeof text === "string") {
          const lines = text.split("\n");
          const column = lines[0].split(",");
          let row: string[][] = [];
          lines.forEach((line, index) => {
            if (index !== 0) {
              row.push(line.split(","));
            }
          });
          let temp2: ColumnData[] = [];
          row.forEach((rowData) => {
            let temp1: ColumnData = {};
            column.forEach((columnName, columnIndex) => {
              temp1[columnName] = rowData[columnIndex];
            });
            temp2.push(temp1);
            setColumns(temp2);
          });
        }
      };
      reader.readAsText(csvFile);
    } else {
      router.push("/upload-csv");
    }
  }, [csvFile]);
  const redirect = () => {
    router.push("/edit-pdf");
  };
  return (
    <>
      <FileUpload
        onUpload={onUpload}
        buttonText="browse for a CSV on your computer"
        onContinue={redirect}
      >
        <h2>Drag and Drop CSV Here to Get Started!</h2>
        <p>
          Use the button below to upload your documents to PDF Editor and begin
          <br />
          editing, signing, and sharing. editor supports <strong>CSV</strong>,
          <strong> Google Sheet</strong>,
          <br />
          <strong>Excel</strong>, <strong>JPEG</strong>,<strong>PNG</strong> and{" "}
          <strong>Text</strong> formats.
        </p>
      </FileUpload>
    </>
  );
};

export default UploadCsv;
