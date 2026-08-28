"use client";

import { useCallback } from "react";

interface UploadZoneProps {
  accept: string;
  label: string;
  sublabel: string;
  onFileSelect: (url: string) => void;
  preview: string | null;
}

export default function UploadZone({
  accept,
  label,
  sublabel,
  onFileSelect,
  preview,
}: UploadZoneProps) {
  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) onFileSelect(e.target.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  return (
    <div
      className="group relative rounded-xl border-2 border-dashed border-white/10 bg-black/20 p-6 text-center transition-all hover:border-tag-yellow/50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="mx-auto h-24 w-full rounded-lg object-contain"
        />
      ) : (
        <>
          <div className="mb-2 text-3xl">📁</div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-xs text-gray-400">{sublabel}</p>
        </>
      )}
    </div>
  );
}
