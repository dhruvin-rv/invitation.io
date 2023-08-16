import React, { useRef, useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { RenderTask } from "pdfjs-dist";
import styles from "./pdfViewer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.js";

type PDFProviderProps = {
  onAreaSelected: (startX: number, startY: number) => void;
};

const PDFProvider = ({ onAreaSelected }: PDFProviderProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | null>(null);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);

  const renderingTaskRef = useRef<RenderTask | any>(null);
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
      const rect = canvas.current?.getBoundingClientRect();
      return {
        x: event.clientX - rect?.left,
        y: event.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjs.getDocument("nodedev.pdf").promise;
        setTotalPages(pdf.numPages);
        const page = await pdf.getPage(currentPage);
        const scale = 1;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d")!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;

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
          } catch (error) {
            // Handle cancellation or other errors
            console.error("Rendering task error:", error);
          }
        }
      } catch (error) {
        console.error("PDF loading error:", error);
      }
    };

    // Delay starting new rendering task to avoid conflicts
    const delay = 300; // Adjust this delay as needed
    const timeoutId = setTimeout(() => {
      loadPdf();
    }, delay);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    };
  }, [currentPage]);

  useEffect(() => {});

  const startDrawingRect = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    const { x, y } = getMousePosition(canvasRef, nativeEvent);
    console.log("cur x->", x);
    console.log("cur y->", y);
    setIsDrawing(true);
  };
  const drawRect = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return;
    nativeEvent.stopPropagation();
    nativeEvent.preventDefault();
  };
  const stopDrawingRect = () => {
    setIsDrawing(false);
  };
  return (
    <div className={styles.view_main}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawingRect}
        onMouseMove={drawRect}
        onMouseUp={stopDrawingRect}
        onMouseLeave={stopDrawingRect}
      ></canvas>
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
