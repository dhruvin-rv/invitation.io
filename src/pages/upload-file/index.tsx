import FileUpload from "@/components/fileUploader/fileUploader.component";
import { useUploadContext } from "@/context/files.context";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const UploadFile = () => {
  const router = useRouter();
  const { setUploadedFile } = useUploadContext();
  const onUpload = (files: FileList) => {
    setUploadedFile(files[0]);
  };

  const redirect = () => {
    router.push("/upload-csv");
  };
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name="author" content="Invitation.io"></meta>
        <meta property="og:title" content="Upload PDF - Invitation.io" key="title" />
        <meta name="description" content="Upload PDF"></meta>
        <meta name="robots" content="index, no-follow"></meta>
        <title>Upload PDF - Invitation.io</title>
      </Head>
      <FileUpload
        onUpload={onUpload}
        buttonText="Select PDF file from your device to continue"
        onContinue={redirect}
        uploadType="application/pdf"
        accept=".pdf"
      >
        <h2>Drag and Drop PDF Here to Get Started!</h2>
        <p>
          Use the button below to upload your documents to PDF Editor and begin
        </p>
      </FileUpload>
    </>
  );
};

export default UploadFile;
