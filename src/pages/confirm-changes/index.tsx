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
import Link from "next/link";
import { modifyPdf } from "@/utils/pdfGenrator";
pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.js";

const ConfirmChanges = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | null>(null);
  const [isContinue, setIsContinue] = React.useState<boolean>(false);
  const renderingTaskRef = useRef<RenderTask | any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    selections,
    columns,
    setDownloadOption,
    downloadOption,
    uploadedFile,
    pdfWidth,
    setScaledWidth,
    scaledWidth
  } = useUploadContext();
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
        if (!uploadedFile) {
          return router.push("upload-file");
        }
        const pdf = await pdfjs.getDocument(await uploadedFile.arrayBuffer())
          .promise;
        setTotalPages(pdf.numPages);
        const screenSize = window.screen.width<800?window.screen.width:800;
        const screenPercent = (screenSize*100)/620
        const scaleBy = (screenPercent*1)/100
        const page = await pdf.getPage(currentPage);
        const scale = scaleBy
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d")!;
          setScaledWidth(scaleBy)
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
            const currentSelections = selections.filter((e) => {
              return e.pageNumber == currentPage;
            });
            currentSelections.map((e, i) => {
              if (e.selectedOption) {
                context.fillStyle = e.font_color ? e.font_color : "#000000";
                context.font = `${e.font_size + "px" || "20px"} ${
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

  const handleDownload = async () => {
    if (uploadedFile) {
      const pdf = await uploadedFile.arrayBuffer();
      
      columns.map(async (column, colIndex) => {
        const finalPdf = await modifyPdf(pdf, selections, column,scaledWidth);
        const blob = new Blob([finalPdf], { type: "application/pdf" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${column[downloadOption || 0]}.pdf`;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };
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
              <button
                className={styles.download_button}
                onClick={handleDownload}
              >
                Download
              </button>
            )}
          </>
        ) : (
          <>
            <Link className={styles.start_over_btn} href="upload-file">
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                flip="horizontal"
                style={{ color: "#2a61c0", marginRight: "5px" }}
              />
              Start Over
            </Link>
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
