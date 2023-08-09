import FileUpload from "@/components/fileUploader/fileUploader.component";
import React from "react";

const UploadFile = () => {
  const onUpload = (files: FileList) => {
    console.log("Uploaded PDF File", files);
  };
  return (
    <>
      <FileUpload
        onUpload={onUpload}
        buttonText="Select PDF file from your device to continue"
      >
        <h2>Drag and Drop PDF Here to Get Started!</h2>
        <p>
          Use the button below to upload your documents to PDF Editor and begin
          <br />
          editing, signing, and sharing. editor supports <strong>PDF</strong>,
          <strong> Google Sheet</strong>,
          <br />
          <strong>Excel</strong>, <strong>JPEG</strong>,<strong>PNG</strong> and{" "}
          <strong>Text</strong> formats.
        </p>
      </FileUpload>
    </>
  );
};

export default UploadFile;
