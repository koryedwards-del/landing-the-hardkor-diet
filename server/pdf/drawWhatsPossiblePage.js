import { begin1982Page } from './draw1982Frame.js';
import { MODERN_REPORT_COLORS as colors, MODERN_REPORT_FONTS as fonts } from './drawModernReportFrame.js';

const HEADINGS = ['WEIGHT', 'LEAN', 'FAT', 'FAT %'];

function drawLine(doc, page, y, value, { bold = false, size = 9, color = colors.muted } = {}) {
  doc.font(bold ? fonts.bold : fonts.regular).fontSize(size).fillColor(color)
    .text(value, page.x, y, { width: page.width, lineGap: 0 });
}

function drawMetrics(doc, page, y, values) {
  const colWidth = page.width / HEADINGS.length;
  doc.roundedRect(page.x, y, page.width, 48, 5).lineWidth(0.8)
    .fillAndStroke(colors.goldPale, colors.gold);
  HEADINGS.forEach((heading, index) => {
    const left = page.x + index * colWidth;
    if (index) {
      doc.strokeColor(colors.gold).lineWidth(0.45)
        .moveTo(left, y + 8).lineTo(left, y + 40).stroke();
    }
    doc.font(fonts.bold).fontSize(8).fillColor(colors.body)
      .text(heading, left + 12, y + 8, { lineBreak: false });
    doc.fontSize(13).text(values[index], left + 12, y + 24, { lineBreak: false });
  });
}

export function drawWhatsPossiblePage(doc, payload) {
  const page = begin1982Page(doc, payload, 'What’s Possible');
  const { current, desired, minimum, goalDetails, rulesNote } = payload.whatsPossible;
  const y = page.y;
  drawLine(doc, page, y + 3, '[Opening message]');

  drawLine(doc, page, y + 54, 'CURRENT', { bold: true, size: 11, color: colors.body });
  drawMetrics(doc, page, y + 70, current);
  drawLine(doc, page, y + 130, '[Current explanation]');

  drawLine(doc, page, y + 193, 'YOUR DESIRED GOAL', { bold: true, size: 11, color: colors.body });
  drawMetrics(doc, page, y + 209, desired);
  if (goalDetails) drawLine(doc, page, y + 267, goalDetails, { size: 8.5, color: colors.body });
  drawLine(doc, page, y + 287, '[Your desired goal explanation]');

  drawLine(doc, page, y + 332, 'MINIMUM PLAYING WEIGHT', { bold: true, size: 11, color: colors.body });
  drawMetrics(doc, page, y + 348, minimum);
  drawLine(doc, page, y + 408, '[Minimum playing weight explanation]');
  drawLine(doc, page, y + 428, rulesNote);
}
