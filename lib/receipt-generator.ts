import { CostItem, ZodiacSign } from './horoscoop-data';

export interface ReceiptData {
  sign: ZodiacSign;
  dateStr: string;
  timeStr: string;
  terminalId: string;
  karmaScore: number;
  costs: CostItem[];
  totalCost: number;
  gevaar: string;
  coping: string;
  quote: string;
  stamp: string;
  barcodeNum: string;
}

export function downloadReceiptImage(data: ReceiptData) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  // High resolution for crisp social story sharing
  const width = 800;
  const height = 1200;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background: Cyber dark slate
  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, width, height);

  // Receipt dimensions
  const rx = 100;
  const ry = 60;
  const rw = 600;
  const rh = 1080;

  // Drop shadow for neo-brutalist feel
  ctx.fillStyle = '#000000';
  ctx.fillRect(rx + 12, ry + 12, rw, rh);

  // Receipt Paper (warm thermal white/cream)
  ctx.fillStyle = '#FDFDF8';
  ctx.fillRect(rx, ry, rw, rh);

  // Border (neo brutalist 4px black)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.strokeRect(rx, ry, rw, rh);

  // Top and bottom serrated zigzag edges (drawn on canvas)
  ctx.fillStyle = '#09090b';
  const teethCount = 30;
  const toothWidth = rw / teethCount;
  const toothHeight = 10;

  // Bottom serrations
  ctx.beginPath();
  ctx.moveTo(rx, ry + rh);
  for (let i = 0; i < teethCount; i++) {
    const x = rx + i * toothWidth;
    ctx.lineTo(x + toothWidth / 2, ry + rh - toothHeight);
    ctx.lineTo(x + toothWidth, ry + rh);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw receipt text content
  ctx.textAlign = 'center';
  ctx.fillStyle = '#111827';

  // Title
  ctx.font = '900 28px monospace';
  ctx.fillText('*** FUNHOROSCOOP.NL ***', width / 2, ry + 50);

  ctx.font = '600 15px monospace';
  ctx.fillStyle = '#4b5563';
  ctx.fillText(`KASSA 01  ·  TERMINAL #${data.terminalId}`, width / 2, ry + 78);
  ctx.fillText(`${data.dateStr}  ·  ${data.timeStr} CET`, width / 2, ry + 100);

  // Separator line
  ctx.font = '16px monospace';
  ctx.fillStyle = '#111827';
  ctx.fillText('------------------------------------------------', width / 2, ry + 125);

  // Sign & Archetype
  ctx.font = '900 32px monospace';
  ctx.fillText(`${data.sign.symbol}  ${data.sign.name.toUpperCase()}`, width / 2, ry + 165);

  ctx.font = 'italic 16px monospace';
  ctx.fillStyle = '#dc2626';
  ctx.fillText(`"${data.sign.archetype}"`, width / 2, ry + 195);

  ctx.font = '700 15px monospace';
  ctx.fillStyle = '#111827';
  ctx.fillText(`Karma-balans: ${data.karmaScore}% [CRITISCH LAAG]`, width / 2, ry + 225);

  // Separator
  ctx.fillText('------------------------------------------------', width / 2, ry + 250);

  // Costs header
  ctx.textAlign = 'left';
  ctx.font = '800 15px monospace';
  ctx.fillText('EMOTIONELE KOSTENPOSTEN:', rx + 40, ry + 280);

  // 3 Cost items
  let curY = ry + 310;
  data.costs.forEach((cost) => {
    ctx.font = '500 14px monospace';
    ctx.fillStyle = '#1f2937';
    // Wrap description if long
    const desc = cost.description.length > 28 ? cost.description.slice(0, 27) + '…' : cost.description;
    ctx.fillText(`1x ${desc}`, rx + 40, curY);

    ctx.textAlign = 'right';
    ctx.fillText(`€ ${cost.price.toFixed(2).replace('.', ',')}`, rx + rw - 40, curY);
    ctx.textAlign = 'left';
    curY += 32;
  });

  // Total
  curY += 10;
  ctx.textAlign = 'center';
  ctx.fillText('------------------------------------------------', width / 2, curY);
  curY += 30;

  ctx.textAlign = 'left';
  ctx.font = '900 20px monospace';
  ctx.fillText('TOTAAL SCHADE:', rx + 40, curY);
  ctx.textAlign = 'right';
  ctx.fillText(`€ ${data.totalCost.toFixed(2).replace('.', ',')}`, rx + rw - 40, curY);
  curY += 22;

  ctx.font = '12px monospace';
  ctx.fillStyle = '#6b7280';
  ctx.fillText('Inclusief 21% Karma-belasting & Teleurstelling', rx + rw - 40, curY);
  curY += 25;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#111827';
  ctx.fillText('------------------------------------------------', width / 2, curY);
  curY += 30;

  // Gevaar sectie
  ctx.textAlign = 'left';
  ctx.font = '800 14px monospace';
  ctx.fillStyle = '#991b1b';
  ctx.fillText('⚠ GEVAAR VANDAAG:', rx + 40, curY);
  curY += 24;

  ctx.font = '500 13px monospace';
  ctx.fillStyle = '#1f2937';
  wrapText(ctx, data.gevaar, rx + 40, curY, rw - 80, 20);
  curY += 50;

  // Coping sectie
  ctx.font = '800 14px monospace';
  ctx.fillStyle = '#065f46';
  ctx.fillText('💡 AANBEVOLEN COPING:', rx + 40, curY);
  curY += 24;

  ctx.font = '500 13px monospace';
  ctx.fillStyle = '#1f2937';
  wrapText(ctx, data.coping, rx + 40, curY, rw - 80, 20);
  curY += 50;

  // Kosmisch advies
  ctx.textAlign = 'center';
  ctx.font = 'italic 13px monospace';
  ctx.fillStyle = '#4b5563';
  wrapText(ctx, `"${data.quote}"`, width / 2, curY, rw - 80, 18, true);
  curY += 45;

  // Barcode
  drawCanvasBarcode(ctx, width / 2, curY, 320, 45);
  curY += 55;
  ctx.font = '12px monospace';
  ctx.fillStyle = '#111827';
  ctx.fillText(`* ${data.barcodeNum} *`, width / 2, curY);

  // Subtiel watermerk (blijft zichtbaar in reposts)
  ctx.font = '11px monospace';
  ctx.fillStyle = '#9ca3af';
  ctx.fillText('✦ funhoroscoop.nl ✦', width / 2, curY + 18);

  // Angled Stamp
  ctx.save();
  ctx.translate(rx + rw - 130, ry + 230);
  ctx.rotate((-18 * Math.PI) / 180);
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 4;
  ctx.strokeRect(-90, -25, 180, 50);

  ctx.font = '900 18px monospace';
  ctx.fillStyle = '#dc2626';
  ctx.fillText(data.stamp, 0, 8);
  ctx.restore();

  // Trigger download
  const imageURI = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `funhoroscoop-${data.sign.slug}-${Date.now()}.png`;
  link.href = imageURI;
  link.click();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  center = false
) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      if (center) {
        ctx.textAlign = 'center';
        ctx.fillText(line.trim(), x, curY);
      } else {
        ctx.fillText(line.trim(), x, curY);
      }
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (center) {
    ctx.textAlign = 'center';
    ctx.fillText(line.trim(), x, curY);
  } else {
    ctx.fillText(line.trim(), x, curY);
  }
}

function drawCanvasBarcode(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  topY: number,
  width: number,
  height: number
) {
  const startX = centerX - width / 2;
  const bars = [
    3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 2, 1, 2, 3, 1, 4, 1, 2, 3, 2, 4, 1, 3, 1, 2, 4, 2, 1,
    3, 2, 1, 4, 3, 2, 1, 3, 4, 1, 2, 3, 2, 4, 1, 2, 3,
  ];

  let currentX = startX;
  ctx.fillStyle = '#000000';
  for (let i = 0; i < bars.length; i++) {
    const w = bars[i] * 1.5;
    if (i % 2 === 0) {
      ctx.fillRect(currentX, topY, w, height);
    }
    currentX += w;
    if (currentX >= startX + width) break;
  }
}
