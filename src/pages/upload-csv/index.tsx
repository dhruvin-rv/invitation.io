import FileUpload from "@/components/fileUploader/fileUploader.component";
import { useUploadContext } from "@/context/files.context";
import { useRouter } from "next/router";
import React from "react";

const UploadCsv = () => {
  const router = useRouter();
  const { setCsvFile } = useUploadContext();
  const onUpload = (files: FileList) => {
    setCsvFile(files[0]);
  };
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
