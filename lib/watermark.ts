export interface WatermarkSettings {
  position: string;
  size: number;
  opacity: number;
  rotation: number;
  padding: number;
  tiled: boolean;
  shadow: boolean;
  textWatermark?: string;
  textColor?: string;
  textSize?: number;
  exportFormat?: string;
  exportQuality?: number;
}

export function getPosition(
  canvasW: number,
  canvasH: number,
  logoW: number,
  logoH: number,
  position: string,
  padding: number
): [number, number] {
  const positions: Record<string, [number, number]> = {
    tl: [padding, padding],
    tc: [(canvasW - logoW) / 2, padding],
    tr: [canvasW - logoW - padding, padding],
    ml: [padding, (canvasH - logoH) / 2],
    mc: [(canvasW - logoW) / 2, (canvasH - logoH) / 2],
    mr: [canvasW - logoW - padding, (canvasH - logoH) / 2],
    bl: [padding, canvasH - logoH - padding],
    bc: [(canvasW - logoW) / 2, canvasH - logoH - padding],
    br: [canvasW - logoW - padding, canvasH - logoH - padding],
  };
  return positions[position] || positions.br;
}

export function drawLogo(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.restore();
}

export function drawTextWatermark(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.fillStyle = color || "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

export function renderWatermarkOnCanvas(
  canvas: HTMLCanvasElement,
  mediaImg: HTMLImageElement,
  logoImg: HTMLImageElement | null,
  settings: WatermarkSettings,
  customPos: { x: number; y: number } | null = null
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const mw = mediaImg.naturalWidth || mediaImg.width;
  const mh = mediaImg.naturalHeight || mediaImg.height;
  canvas.width = mw;
  canvas.height = mh;

  ctx.clearRect(0, 0, mw, mh);
  ctx.drawImage(mediaImg, 0, 0, mw, mh);

  ctx.save();
  ctx.globalAlpha = settings.opacity;

  if (settings.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = Math.max(8, mw * 0.01);
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
  }

  if (logoImg) {
    const ratio = logoImg.width / logoImg.height;
    const logoW = (mw * settings.size) / 100;
    const logoH = logoW / ratio;

    let lx: number, ly: number;
    if (customPos) {
      lx = customPos.x - logoW / 2;
      ly = customPos.y - logoH / 2;
    } else {
      [lx, ly] = getPosition(mw, mh, logoW, logoH, settings.position, settings.padding);
    }

    if (settings.tiled) {
      const cols = Math.ceil(mw / (logoW + settings.padding));
      const rows = Math.ceil(mh / (logoH + settings.padding));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tx = c * (logoW + settings.padding) + settings.padding;
          const ty = r * (logoH + settings.padding) + settings.padding;
          drawLogo(ctx, logoImg, tx + logoW / 2, ty + logoH / 2, logoW, logoH, settings.rotation);
        }
      }
    } else {
      drawLogo(ctx, logoImg, lx + logoW / 2, ly + logoH / 2, logoW, logoH, settings.rotation);
    }
  }

  if (settings.textWatermark && settings.textWatermark.trim() !== "") {
    const textStr = settings.textWatermark.trim();
    const fontSize = Math.max(12, (mw * (settings.textSize || 16)) / 500);

    ctx.font = `bold ${fontSize}px sans-serif`;
    const textMetrics = ctx.measureText(textStr);
    const textW = textMetrics.width;
    const textH = fontSize;

    let tx: number, ty: number;
    if (customPos && !logoImg) {
      tx = customPos.x;
      ty = customPos.y;
    } else {
      const [posLeft, posTop] = getPosition(
        mw,
        mh,
        textW,
        textH,
        settings.position,
        settings.padding
      );
      const yOffset = logoImg ? textH * 1.5 : 0;
      tx = posLeft + textW / 2;
      ty = posTop + textH / 2 + yOffset;
    }

    drawTextWatermark(
      ctx,
      textStr,
      tx,
      ty,
      fontSize,
      settings.textColor || "#ffffff",
      settings.rotation
    );
  }

  ctx.restore();
}
