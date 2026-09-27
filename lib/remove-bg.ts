import { rasterizeToPngBlob } from "./image-decode";

/**
 * Rasterize any supported image, then run IMGLY background removal.
 * Returns an object URL of a transparent PNG.
 */
export async function removeImageBackground(
  source: string,
  options: { signal?: AbortSignal } = {}
): Promise<string> {
  const { signal } = options;
  if (signal?.aborted) {
    throw new DOMException("The operation was aborted", "AbortError");
  }

  const pngBlob = await rasterizeToPngBlob(source);
  if (signal?.aborted) {
    throw new DOMException("The operation was aborted", "AbortError");
  }

  const { removeBackground } = await import("@imgly/background-removal");
  const cutout = await removeBackground(pngBlob, {
    output: { format: "image/png", quality: 0.9 },
  });

  if (signal?.aborted) {
    throw new DOMException("The operation was aborted", "AbortError");
  }

  return URL.createObjectURL(cutout);
}
