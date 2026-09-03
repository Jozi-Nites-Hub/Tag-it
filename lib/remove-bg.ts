import { rasterizeToPngBlob } from "./image-decode";

/**
 * Rasterize any supported image, then run IMGLY background removal.
 * Returns an object URL of a transparent PNG.
 */
export async function removeImageBackground(source: string): Promise<string> {
  const pngBlob = await rasterizeToPngBlob(source);
  const { removeBackground } = await import("@imgly/background-removal");
  const cutout = await removeBackground(pngBlob, {
    output: { format: "image/png", quality: 0.9 },
  });
  return URL.createObjectURL(cutout);
}
