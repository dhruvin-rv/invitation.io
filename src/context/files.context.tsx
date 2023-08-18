import React, { createContext, useContext, useState, ReactNode } from "react";

interface UploadContextProps {
  children: ReactNode;
}
type CanvasSelection = {
  readonly location: { x: number; y: number; xe: number; ye: number };
  readonly pageNumber: number;
};
interface UploadContextValue {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  csvFile: File | null;
  setCsvFile: (file: File | null) => void;
  selections: CanvasSelection[];
  setSelections: (selection: CanvasSelection[]) => void;
}

const UploadContext = createContext<UploadContextValue | undefined>(undefined);

export const UploadProvider: React.FC<UploadContextProps> = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [selections, setSelections] = useState<CanvasSelection[]>([]);
  return (
    <UploadContext.Provider
      value={{
        uploadedFile,
        setUploadedFile,
        csvFile,
        setCsvFile,
        selections,
        setSelections,
      }}
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
