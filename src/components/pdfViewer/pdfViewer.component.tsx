import React, { useRef, useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { RenderTask } from "pdfjs-dist";
import styles from "./pdfViewer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useUploadContext } from "@/context/files.context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.js";
interface PDFProviderProps {
  selectMode: boolean;
}
const PDFProvider = ({ selectMode }: PDFProviderProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasToDraw = useRef<HTMLCanvasElement | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | null>(null);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [startX, setStartX] = React.useState<number>(0);
  const [startY, setStartY] = React.useState<number>(0);
  const [endX, setEndX] = React.useState<number>(0);
  const [endY, setEndY] = React.useState<number>(0);
  const [canvasWidth, setCanvasWidth] = React.useState<number>(0);
  const [canvasHeight, setCanvasHeight] = React.useState<number>(0);
  const renderingTaskRef = useRef<RenderTask | any>(null);
  const {
    setSelections,
    selections,
    csvFile,
    setIsSelected,
    isSelected,
    uploadedFile,
  } = useUploadContext();
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);
  const [columns, setColumns] = React.useState<Array<string>>([]);
  const router = useRouter();

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages!) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getMousePosition = (
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    event: MouseEvent
  ) => {
    if (canvas.current) {
      return {
        x: event.offsetX,
        y: event.offsetY,
      };
    }
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text: any = e.target?.result;
        const lines = text.split("\n");
        setColumns(lines[0].split(","));
      };
      reader.readAsText(csvFile);
    } else {
      router.push("/upload-csv");
    }
  }, []);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        if (!uploadedFile) {
          return router.push("upload-file");
        }
        const pdf = await pdfjs.getDocument(await uploadedFile?.arrayBuffer())
          .promise;
        setTotalPages(pdf.numPages);
        const page = await pdf.getPage(currentPage);
        const scale = 1;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d")!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          setCanvasWidth(viewport.width);
          setCanvasHeight(viewport.height);
          // Cancel previous rendering task, if any
          if (renderingTaskRef.current) {
            renderingTaskRef.current.cancel();
          }

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          // Store the new rendering task
          renderingTaskRef.current = page.render(renderContext);
          try {
            await renderingTaskRef.current.promise;
            const currentSelections = selections.filter(
              (e) => e.pageNumber == currentPage
            );
            currentSelections.map((e) => {
              drawOnPageChange(
                e.location.x,
                e.location.y,
                e.location.xe,
                e.location.ye
              );
            });
            const context = canvasToDraw.current?.getContext("2d");
            if (canvasToDraw.current) {
              context?.clearRect(
                0,
                0,
                canvasToDraw.current.width,
                canvasToDraw.current.height
              );
            }
          } catch (error) {
            // Handle cancellation or other errors
            console.error("Rendering task error:", error);
          }
        }
      } catch (error) {
        console.error("PDF loading error:", error);
      }
    };

    const delay = 300;
    const timeoutId = setTimeout(() => {
      loadPdf();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentPage]);

  useEffect(() => {
    const drawCanvas = canvasToDraw.current;
    if (drawCanvas) {
      drawCanvas.height = canvasHeight;
      drawCanvas.width = canvasWidth;
    }
  }, [canvasHeight, canvasWidth]);

  const startDrawingRect = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (selections.length > 0 && !isSelected) {
      return toast.error(
        "Please select the column for previous selection to create new selection"
      );
    }
    if (
      selections.length > 0 &&
      (!selections[selections.length - 1].font ||
        selections[selections.length - 1].font == "N/A")
    ) {
      toast.error("Please select the font for previous selection");
    } else {
      if (selectMode) {
        nativeEvent.preventDefault();
        nativeEvent.stopPropagation();
        const { x, y } = getMousePosition(canvasToDraw, nativeEvent);
        setStartX(x);
        setStartY(y);
        setEndX(x);
        setEndY(y);
        setIsDrawing(true);
      }
    }
  };

  const drawRect = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return;
    nativeEvent.stopPropagation();
    nativeEvent.preventDefault();

    const { x, y } = getMousePosition(canvasToDraw, nativeEvent);
    setEndX(x);
    setEndY(y);

    const context = canvasToDraw.current?.getContext("2d");
    if (canvasToDraw.current && isDrawing) {
      context?.clearRect(
        0,
        0,
        canvasToDraw.current.width,
        canvasToDraw.current.height
      );
      context?.setLineDash([5]);
      context?.strokeRect(startX, startY, endX - startX, endY - startY);
    }
  };

  const drawOnMainCanvas = (sx: number, sy: number, ex: number, ey: number) => {
    const context = canvasRef.current?.getContext("2d");
    if (canvasToDraw.current && isDrawing) {
      context?.setLineDash([5]);
      context?.strokeRect(sx, sy, ex, ey);
    }
    setIsSelected(false);
  };

  const drawOnPageChange = (sx: number, sy: number, ex: number, ey: number) => {
    const context = canvasRef.current?.getContext("2d");
    if (canvasToDraw.current) {
      context?.setLineDash([5]);
      context?.strokeRect(sx, sy, ex, ey);
    }
  };

  const stopDrawingRect = () => {
    if (!isDrawing) return;
    drawOnMainCanvas(startX, startY, endX - startX, endY - startY);
    setSelections([
      ...selections,
      {
        location: {
          x: startX,
          y: startY,
          xe: endX - startX,
          ye: endY - startY,
        },
        pageNumber: currentPage,
        selectedOption: null,
        font: null,
        font_size: null,
        font_color: "#000000",
        font_name: null,
      },
    ]);

    setIsDrawing(false);
    setEndX(0);
    setEndY(0);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newValue = event.target.value;
    setSelectedValues((prevSelectedValues) => {
      const updatedValues = [...prevSelectedValues];
      updatedValues[index] = newValue;
      return updatedValues;
    });
    if (newValue === "0") {
      const updatedSelections = selections.map((selection, i) => {
        if (i === index) {
          return {
            ...selection,
            selectedOption: null,
          };
        }
        return selection;
      });
      setSelections(updatedSelections);
      setIsSelected(false);
    } else {
      const updatedSelections = selections.map((selection, i) => {
        if (i === index) {
          return {
            ...selection,
            selectedOption: newValue,
            font_size: 12,
          };
        }
        return selection;
      });
      setSelections(updatedSelections);
      setIsSelected(true);
    }
  };

  return (
    <div className={styles.view_main}>
      <div style={{ position: "relative" }}>
        <canvas ref={canvasRef}></canvas>
        <canvas
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
          ref={canvasToDraw}
          onMouseDown={startDrawingRect}
          onMouseMove={drawRect}
          onMouseUp={stopDrawingRect}
          onMouseLeave={stopDrawingRect}
        ></canvas>
        {selections.map((selection, index) => {
          if (selection.pageNumber == currentPage) {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: selection.location.x,
                  top: selection.location.y + selection.location.ye,
                  background: "white",
                  border: "1px solid #ccc",
                  padding: "5px",
                }}
              >
                <select
                  style={{
                    border: "none",
                  }}
                  value={selectedValues[index] || ""}
                  onChange={(e) => handleDropdownChange(e, index)}
                >
                  <option value={0}>Select Row</option>
                  {columns.map((column, columnIndex) => (
                    <option key={columnIndex} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.page_selector}>
        <button
          className={styles.buttons}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div>
          {currentPage} / {totalPages}
        </div>
        <button
          className={styles.buttons}
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default PDFProvider;
