import React, { createContext, useContext, useState, ReactNode } from "react";

interface UploadContextProps {
  children: ReactNode;
}
export type CanvasSelection = {
  readonly location: { x: number; y: number; xe: number; ye: number };
  readonly pageNumber: number;
  readonly selectedOption?: string | null;
  readonly font: string | null;
  readonly font_size: number | null;
  readonly font_color: string | null;
  readonly font_name: string | null;
};

export type ColumnsData = {
  [key: string]: string;
};

interface UploadContextValue {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  csvFile: File | null;
  setCsvFile: (file: File | null) => void;
  selections: CanvasSelection[];
  setSelections: React.Dispatch<React.SetStateAction<CanvasSelection[]>>;
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  columns: ColumnsData[];
  setColumns: (data: ColumnsData[]) => void;
  downloadOption: string | null;
  setDownloadOption: (option: string) => void;
  pdfWidth: number | null;
  setPdfWidth: (width: number) => void;
  scaledWidth: number;
  setScaledWidth: (percentage: number) => void;
}

const UploadContext = createContext<UploadContextValue | undefined>(undefined);

export const UploadProvider: React.FC<UploadContextProps> = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [scaledWidth,setScaledWidth] = useState<number>(0);
  const [selections, setSelections] = useState<CanvasSelection[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [columns, setColumns] = useState<ColumnsData[]>([]);
  const [downloadOption, setDownloadOption] = useState<string | null>(null);
  const [pdfWidth, setPdfWidth] = useState<number | null>(null);


  return (
    <UploadContext.Provider
      value={{
        uploadedFile,
        setUploadedFile,
        csvFile,
        setCsvFile,
        selections,
        setSelections,
        isSelected,
        setIsSelected,
        columns,
        setColumns,
        downloadOption,
        setDownloadOption,
        pdfWidth,
        setPdfWidth,
        scaledWidth,
        setScaledWidth
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
