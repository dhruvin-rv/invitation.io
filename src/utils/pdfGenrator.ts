import { CanvasSelection } from "@/context/files.context";
import { rgb, PDFDocument } from "pdf-lib";
import fontKit from "@pdf-lib/fontkit";
function hexToRgb(
  hex: string,
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
) {
  return result ? result.map((i) => parseInt(i, 16)).slice(1) : [0, 0, 0];
  //returns [23, 14, 45] -> reformat if needed
}

export const modifyPdf = async (
  pdf: ArrayBuffer,
  selections: CanvasSelection[],
  column: { [key: string]: string }
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(pdf);
  pdfDoc.registerFontkit(fontKit);
  const { height } = pdfDoc.getPage(1).getSize();
  for (let i = 0; i < selections.length; i++) {
    const selection = selections[i];
    const fontBytes = await fetch(`/fonts/${selection.font}.ttf`);
    const ft = await fontBytes.arrayBuffer();
    const customFont = await pdfDoc.embedFont(ft, { subset: true });
    const pages = pdfDoc.getPages();
    const currentPage = pages[selection.pageNumber - 1];
    const color = hexToRgb(
      selection.font_color ? selection.font_color : "#000000"
    );
    currentPage.drawText(column[`${selection?.selectedOption}`], {
      font: customFont,
      x: selection.location.x,
      y: height - (selection.location.y + selection.location.ye),
      size: selection.font_size ? selection.font_size : 20,
      color: rgb(color[0] / 255 || 0, color[1] / 255 || 0, color[2] / 255 || 0),
    });
  }
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
