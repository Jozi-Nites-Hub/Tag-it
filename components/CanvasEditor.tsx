"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { WatermarkSettings } from "./Studio";
import { getPosition, drawLogo } from "@/lib/watermark";

interface CanvasEditorProps {
  logo: string | null;
  media: string | null;
  settings: WatermarkSettings;
}

export default function CanvasEditor({ logo, media, settings }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [mediaImg, setMediaImg] = useState<HTMLImageElement | null>(null);
  const [customPos, setCustomPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (logo) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setLogoImg(img);
      img.src = logo;
    }
  }, [logo]);

  useEffect(() => {
    if (media) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setMediaImg(img);
      img.src = media;
    }
  }, [media]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !logoImg || !mediaImg) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mw = mediaImg.naturalWidth || mediaImg.width;
    const mh = mediaImg.naturalHeight || mediaImg.height;
    canvas.width = mw;
    canvas.height = mh;

    ctx.clearRect(0, 0, mw, mh);
    ctx.drawImage(mediaImg, 0, 0, mw, mh);

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

    ctx.save();
    ctx.globalAlpha = settings.opacity;
    if (settings.shadow) {
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
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
    ctx.restore();
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    setCustomPos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseLeave = useCallback(() => setIsDragging(false), []);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `tagged-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const handleReset = useCallback(() => setCustomPos(null), []);

  const isReady = logoImg && mediaImg;

  return (
    <div>
      <div className="relative flex min-h-[500px] items-center justify-center rounded-2xl border border-tag-yellow/20 bg-black/50 backdrop-blur-sm">
        {!isReady ? (
          <div className="text-center text-gray-400">
            <div className="mb-4 text-5xl">🎨</div>
            <p className="text-lg font-bold text-white">Ready to Tag-it</p>
            <p className="text-sm">Upload your logo and media to start watermarking</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-h-[65vh] max-w-full cursor-crosshair rounded-lg shadow-2xl"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>

      {isReady && (
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleReset}
            className="rounded-full border-2 border-tag-yellow px-5 py-2.5 text-sm font-bold text-tag-yellow transition-all hover:bg-tag-yellow hover:text-black"
          >
            ↺ Reset Position
          </button>
          <button
            onClick={handleDownload}
            className="rounded-full bg-gradient-to-r from-tag-green to-tag-green-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-tag-green/20 transition-transform hover:-translate-y-0.5"
          >
            ⬇ Download
          </button>
        </div>
      )}
    </div>
  );
}
