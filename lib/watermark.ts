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
