const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/tiff",
  "image/tif",
  "image/x-tiff",
  "image/bmp",
  "image/x-ms-bmp",
  "image/avif",
]);

const ALLOWED_EXT = new Set([
  "png",
  "jpg",
  "jpeg",
  "svg",
  "webp",
  "gif",
  "tif",
  "tiff",
  "bmp",
  "avif",
]);

export function isAllowedImageFile(file: File): boolean {
  const mime = (file.type || "").toLowerCase();
  if (mime && ALLOWED_MIME.has(mime)) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  return ALLOWED_EXT.has(ext);
}

export function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(
        new Error(
          "This file could not be decoded in your browser. Try PNG, JPG, SVG, WebP or GIF."
        )
      );
    img.src = src;
  });
}

/** Convert any browser-decodable image (incl. SVG/GIF first frame) to a PNG blob. */
export async function rasterizeToPngBlob(
  src: string,
  maxEdge = 2048
): Promise<Blob> {
  const img = await loadHtmlImage(src);
  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;
  if (!w || !h) {
    w = 1024;
    h = 1024;
  }
  const scale = Math.min(1, maxEdge / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  if (!blob) throw new Error("Could not convert this image to PNG.");
  return blob;
}
