import FileUpload from "@/components/fileUploader/fileUploader.component";
import { useUploadContext } from "@/context/files.context";
import Head from "next/head";
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
      <Head>
        <meta charSet='UTF-8' />
        <meta name="author" content="Invitation.io"></meta>
        <meta property="og:title" content="Upload CSV - Invitation.io" key="title" />
        <meta name="description" content="Upload CSV"></meta>
        <meta name="robots" content="index, no-follow"></meta>
        <title>Upload CSV - Invitation.io</title>
      </Head>
      <FileUpload
        onUpload={onUpload}
        buttonText="browse for a CSV on your computer"
        onContinue={redirect}
        uploadType="text/csv"
        accept=".csv"
      >
        <h2>Drag and Drop CSV Here to Get Started!</h2>
        <p>
          Use the button below to upload your documents to CSV Editor and begin
        </p>
      </FileUpload>
    </>
  );
};

export default UploadCsv;
