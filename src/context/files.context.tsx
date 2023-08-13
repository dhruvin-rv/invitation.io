import React, { createContext, useContext, useState, ReactNode } from "react";

interface UploadContextProps {
  children: ReactNode;
}

interface UploadContextValue {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  csvFile: File | null;
  setCsvFile: (file: File | null) => void;
}

const UploadContext = createContext<UploadContextValue | undefined>(undefined);

export const UploadProvider: React.FC<UploadContextProps> = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  return (
    <UploadContext.Provider
      value={{ uploadedFile, setUploadedFile, csvFile, setCsvFile }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};
