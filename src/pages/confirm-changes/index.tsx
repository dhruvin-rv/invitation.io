import React, { useEffect, useRef, useState } from "react";
import styles from "./confirmChanges.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { pdfjs } from "react-pdf";
import { RenderTask } from "pdfjs-dist";
import { useUploadContext } from "@/context/files.context";
import { useRouter } from "next/router";
pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.js";
interface ColumnData {
  [key: string]: string;
}

const ConfirmChanges = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | null>(null);
  const renderingTaskRef = useRef<RenderTask | any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { selections, csvFile } = useUploadContext();
  const [columns, setColumns] = React.useState<Array<string>>([]);
  const [csvData, setCsvData] = React.useState<any[]>([]);
  const [isRendering, setIsRendering] = React.useState<boolean>(false);
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

  useEffect(() => {
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text: any = e.target?.result;
        if (typeof text === "string") {
          const lines = text.split("\n");
          setColumns(lines[0].split(","));
          let row: string[][] = [];
          lines.forEach((line, index) => {
            if (index !== 0) {
              row.push(line.split(","));
            }
          });
          let temp2: ColumnData[] = [];
          row.forEach((rowData) => {
            let temp1: ColumnData = {};
            columns.forEach((columnName, columnIndex) => {
              temp1[columnName] = rowData[columnIndex];
            });
            temp2.push(temp1);
            console.log("temp 2 --->", temp2);
            setCsvData(temp2);
            console.log("csv data --->", csvData);
          });
        }
      };
      reader.readAsText(csvFile);
    } else {
      router.push("/upload-csv");
    }
  }, []);

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
          if (renderingTaskRef.current) {
            renderingTaskRef.current.cancel();
          }
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          renderingTaskRef.current = page.render(renderContext);
          try {
            await renderingTaskRef.current.promise;
            console.log("csvData --->", csvData);
            if (csvData.length > 0) {
              const canvas = canvasRef.current;
              const context = canvas?.getContext("2d");
              if (context) {
                selections.map((e, i) => {
                  console.log("selection -->", e);
                  if (e.selectedOption) {
                    console.log("selection 1 -->", e);
                    context.fillStyle = "blue";
                    context.font = "bold 16px Arial";
                    context.textAlign = "left";
                    context.textBaseline = "bottom";
                    context.fillText(
                      csvData[0][e.selectedOption],
                      e.location.x,
                      e.location.y + e.location.ye
                    );
                  }
                });
              }
            }
          } catch (error) {
            console.error("Rendering task error:", error);
          }
        }
      } catch (error) {
        console.error("PDF loading error:", error);
      }
    };
    loadPdf();
  }, [currentPage]);

  return (
    <>
      <div className={styles.navs}>
        <button className={styles.start_over_btn}>
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            flip="horizontal"
            style={{ color: "#2a61c0", marginRight: "5px" }}
          />
          Start Over
        </button>
        <button className={styles.continue_btn}>Continue & Download</button>
      </div>
      <div className={styles.main_view}>
        <div>
          <h2>Confirm Your Changes?</h2>
        </div>
        <div className={styles.pdf_viewer}>
          <canvas ref={canvasRef}></canvas>
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
    </>
  );
};

export default ConfirmChanges;
