"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import JSZip from "jszip";
import confetti from "canvas-confetti";
import { WatermarkSettings, renderWatermarkOnCanvas } from "@/lib/watermark";

interface CanvasEditorProps {
  logo: string | null;
  media: string | null;
  mediaList?: string[];
  activeMediaIndex?: number;
  onSelectMediaIndex?: (index: number) => void;
  settings: WatermarkSettings;
}

export default function CanvasEditor({
  logo,
  media,
  mediaList = [],
  activeMediaIndex = 0,
  onSelectMediaIndex,
  settings,
}: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [mediaImg, setMediaImg] = useState<HTMLImageElement | null>(null);
  const [customPos, setCustomPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState<number>(0);

  useEffect(() => {
    if (logo) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setLogoImg(img);
      img.src = logo;
    } else {
      setLogoImg(null);
    }
  }, [logo]);

  useEffect(() => {
    if (media) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setMediaImg(img);
      img.src = media;
    } else {
      setMediaImg(null);
    }
  }, [media]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mediaImg) return;
    renderWatermarkOnCanvas(canvas, mediaImg, logoImg, settings, customPos);
  }, [logoImg, mediaImg, settings, customPos]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    setCustomPos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      setCustomPos({
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseLeave = useCallback(() => setIsDragging(false), []);

  const getExportExtension = (format?: string) => {
    if (format === "image/jpeg") return "jpg";
    if (format === "image/webp") return "webp";
    return "png";
  };

  const handleSingleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const format = settings.exportFormat || "image/png";
    const quality = settings.exportQuality || 0.92;
    const ext = getExportExtension(format);

    const dataUrl = canvas.toDataURL(format, quality);
    const link = document.createElement("a");
    link.download = `tagged-${Date.now()}.${ext}`;
    link.href = dataUrl;
    link.click();

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
  }, [settings.exportFormat, settings.exportQuality]);

  const handleBatchDownloadZip = useCallback(async () => {
    if (mediaList.length === 0) return;
    setIsZipping(true);
    setZipProgress(0);

    const zip = new JSZip();
    const format = settings.exportFormat || "image/png";
    const quality = settings.exportQuality || 0.92;
    const ext = getExportExtension(format);
    const folder = zip.folder("tagged-media");

    const offscreenCanvas = document.createElement("canvas");

    for (let i = 0; i < mediaList.length; i++) {
      const src = mediaList[i];
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          renderWatermarkOnCanvas(offscreenCanvas, img, logoImg, settings, customPos);
          const dataUrl = offscreenCanvas.toDataURL(format, quality);
          const base64Data = dataUrl.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
          folder?.file(`tagged-${i + 1}.${ext}`, base64Data, { base64: true });
          setZipProgress(Math.round(((i + 1) / mediaList.length) * 100));
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      });
    }

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.download = `tagged-batch-${Date.now()}.zip`;
    link.href = URL.createObjectURL(content);
    link.click();

    setIsZipping(false);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
  }, [mediaList, logoImg, settings, customPos]);

  const handleReset = useCallback(() => setCustomPos(null), []);

  const isReady = mediaImg && (logoImg || (settings.textWatermark && settings.textWatermark.trim() !== ""));

  return (
    <div className="space-y-4">
      <div className="relative flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-tag-yellow/20 bg-black/50 p-4 backdrop-blur-sm">
        {!isReady ? (
          <div className="p-8 text-center text-gray-400">
            <div className="mb-4 text-5xl">🎨</div>
            <p className="text-lg font-bold text-white">Ready to Tag-it</p>
            <p className="mt-1 text-sm text-gray-400">
              Upload your logo / text watermark and media to preview
            </p>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center">
            <canvas
              ref={canvasRef}
              className="max-h-[60vh] max-w-full cursor-crosshair rounded-lg shadow-2xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        )}
      </div>

      {mediaList.length > 1 && (
        <div className="rounded-xl border border-white/10 bg-tag-surface p-3 backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-gray-300">
            <span>🖼️ Batch Queue ({mediaList.length} items)</span>
            <span className="text-tag-yellow">Selected: #{activeMediaIndex + 1}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {mediaList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectMediaIndex && onSelectMediaIndex(idx)}
                className={`relative flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                  idx === activeMediaIndex
                    ? "border-tag-yellow scale-105 shadow-md shadow-tag-yellow/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={item} alt={`Thumbnail ${idx + 1}`} className="h-14 w-14 object-cover" />
                <span className="absolute bottom-0 right-0 bg-black/80 px-1 py-0.5 text-[9px] font-extrabold text-white">
                  #{idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isReady && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleReset}
            className="rounded-full border-2 border-tag-yellow px-5 py-2.5 text-sm font-bold text-tag-yellow transition-all hover:bg-tag-yellow hover:text-black"
          >
            ↺ Reset Position
          </button>

          <button
            onClick={handleSingleDownload}
            className="rounded-full bg-gradient-to-r from-tag-yellow to-tag-yellow-light px-6 py-2.5 text-sm font-bold text-black shadow-lg shadow-tag-yellow/20 transition-transform hover:-translate-y-0.5"
          >
            ⬇ Download #{activeMediaIndex + 1}
          </button>

          {mediaList.length > 1 && (
            <button
              onClick={handleBatchDownloadZip}
              disabled={isZipping}
              className="rounded-full bg-gradient-to-r from-tag-green to-tag-green-dark px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-tag-green/20 transition-transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isZipping ? `📦 Compressing ZIP (${zipProgress}%)…` : `📦 Download All (${mediaList.length}) ZIP`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
