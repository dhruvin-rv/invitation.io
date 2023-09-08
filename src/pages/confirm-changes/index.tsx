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

const ConfirmChanges = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | null>(null);
  const [isContinue, setIsContinue] = React.useState<boolean>(false);
  const renderingTaskRef = useRef<RenderTask | any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { selections, columns, setDownloadOption, downloadOption } =
    useUploadContext();
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
    if (!selections.length && !columns.length) {
      router.push("upload-csv");
    }
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
            console.log("selections -->", selections);
            console.log("columns -->", columns);
            const currentSelections = selections.filter((e) => {
              return e.pageNumber == currentPage;
            });
            console.log("current selection --->", currentSelections);
            currentSelections.map((e, i) => {
              if (e.selectedOption) {
                context.fillStyle = "blue";
                context.font = `${e.font_size + "px" || "16px"} ${
                  e.font || "Roboto"
                }`;
                context.textAlign = "left";
                context.textBaseline = "bottom";
                context.fillText(
                  columns[0][e.selectedOption],
                  e.location.x,
                  e.location.y + e.location.ye
                );
              }
            });
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
        {isContinue ? (
          <>
            <select
              className={styles.download_option}
              name="download_option"
              id="download_option"
              style={{ textAlign: "center" }}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setDownloadOption(e.target.value);
              }}
            >
              <option value="N/A">Select Option</option>
              {Object.keys(columns[0]).map((o, i) => {
                return (
                  <option value={o} key={i}>
                    Download By {o}
                  </option>
                );
              })}
            </select>
            {downloadOption !== null && downloadOption !== "N/A" && (
              <button className={styles.download_button}>Download</button>
            )}
          </>
        ) : (
          <>
            <button
              className={styles.start_over_btn}
              onClick={() => {
                router.push("upload-file");
              }}
            >
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                flip="horizontal"
                style={{ color: "#2a61c0", marginRight: "5px" }}
              />
              Start Over
            </button>
            <button
              className={styles.continue_btn}
              onClick={() => {
                setIsContinue(true);
              }}
            >
              Continue & Download
            </button>
          </>
        )}
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
