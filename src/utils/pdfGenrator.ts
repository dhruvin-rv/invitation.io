import { CanvasSelection, ColumnsData } from "@/context/files.context";
import { rgb, PDFDocument, StandardFonts, toHexString } from "pdf-lib";

function hexToRgb(
  hex: string,
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
) {
  return result ? result.map((i) => parseInt(i, 16)).slice(1) : [0, 0, 0];
  //returns [23, 14, 45] -> reformat if needed
}

export const modifyPdf = async (
  pdf: ArrayBuffer,
  selection: CanvasSelection[],
  column: { [key: string]: string }
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(pdf);
  const { width, height } = pdfDoc.getPage(1).getSize();
  selection.map(async (selection) => {
    const pages = await pdfDoc.getPages();
    const currentPage = pages[selection.pageNumber - 1];
    console.log(selection.font_color);
    const color = hexToRgb(
      selection.font_color ? selection.font_color : "#000000"
    );
    currentPage.drawText(column[`${selection?.selectedOption}`], {
      x: selection.location.x,
      y: height - (selection.location.y + selection.location.ye),
      size: selection.font_size ? selection.font_size : 20,
      color: rgb(color[0] / 255 || 0, color[1] / 255 || 0, color[2] / 255 || 0),
    });
  });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
