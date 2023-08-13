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
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | null>(null);
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

  const handleAreaSelection = (x: number, y: number) => {
    // Do something with the x and y positions of the selected area
    console.log("Selected area position: ", x, y);
  };

  const [selectionStart, setSelectionStart] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [selectionEnd, setSelectionEnd] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleCanvasMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {};

  const handleCanvasMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    setSelectionEnd({ x, y });

    // Calculate and pass selected area position to the callback
    if (selectionStart && selectionEnd) {
      const selectedAreaX = Math.min(selectionStart.x, selectionEnd.x);
      const selectedAreaY = Math.min(selectionStart.y, selectionEnd.y);
      handleAreaSelection(selectedAreaX, selectedAreaY);

      // Call the area selection function from prop
      onAreaSelected(selectedAreaX, selectedAreaY);
    }

    // Clear the selection
    setSelectionStart(null);
    setSelectionEnd(null);
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
            canvasRef.current?.addEventListener(
              "mousedown",
              handleCanvasMouseDown as any
            );
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

  return (
    <div className={styles.view_main}>
      {selectionStart && selectionEnd && (
        <div
          className={styles["selected-area"]}
          style={{
            top: `${Math.min(selectionStart.y, selectionEnd.y)}px`,
            left: `${Math.min(selectionStart.x, selectionEnd.x)}px`,
            width: `${Math.abs(selectionStart.x - selectionEnd.x)}px`,
            height: `${Math.abs(selectionStart.y - selectionEnd.y)}px`,
          }}
        />
      )}
      <canvas ref={canvasRef}></canvas>
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
