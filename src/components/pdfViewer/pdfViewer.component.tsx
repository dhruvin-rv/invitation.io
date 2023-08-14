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
  const [isDown, setIsDown] = React.useState<boolean>(false);
  const [canvasContext, setCanvasContext] = React.useState<
    CanvasRenderingContext2D | null | undefined
  >(null);
  const [startX, setStartX] = React.useState<number>(0);
  const [startY, setStartY] = React.useState<number>(0);
  const [preveStartX, setPreveStartX] = React.useState(0);
  const [preveStartY, setPreveStartY] = React.useState(0);
  const [preveWidth, setPreveWidth] = React.useState(0);
  const [preveHeight, setPreveHeight] = React.useState(0);
  const [mouseX, setMouseX] = React.useState(0);
  const [mouseY, setMouseY] = React.useState(0);
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
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

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setStartX(event.clientX - rect?.left);
      setStartY(event.clientY - rect?.top);
    }
    setIsDown(true);
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDown(false);
    canvasContext?.strokeRect(
      preveStartX,
      preveStartY,
      preveWidth,
      preveHeight
    );
  };

  const handleMouseOut = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDown(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDown) return;
    setMouseX(event.clientX - offsetX);
    setMouseY(event.clientY - offsetY);
    const width = mouseX - startX;
    const height = mouseY - startY;
    canvasContext?.clearRect(
      0,
      0,
      canvasRef.current?.width || 0,
      canvasRef.current?.height || 0
    );
    canvasContext?.strokeRect(startX, startY, width, height);
    setPreveStartX(startX);
    setPreveHeight(startY);
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
            if (canvasRef.current) {
              setCanvasContext(canvasRef.current?.getContext("2d"));
              canvasRef.current.addEventListener(
                "mousedown",
                handleMouseDown as any
              );
              canvasRef.current.addEventListener(
                "mouseout",
                handleMouseOut as any
              );
              canvasRef.current.addEventListener(
                "mouseup",
                handleMouseUp as any
              );
              canvasRef.current.addEventListener(
                "mousemove",
                handleMouseMove as any
              );
              if (canvasContext) {
                canvasContext.strokeStyle = "blue";
                canvasContext.lineWidth = 3;
              }
              setOffsetX(canvasRef.current.offsetLeft || 0);
              setOffsetX(canvasRef.current.offsetTop || 0);
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
