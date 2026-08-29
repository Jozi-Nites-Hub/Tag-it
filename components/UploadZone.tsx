"use client";

import { useCallback, useState } from "react";

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
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    // Only leave if we actually left the zone (not just moved over a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  return (
    <div
      className={`group relative rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
        isDragging
          ? "border-tag-yellow bg-tag-yellow/10 scale-[1.02] shadow-lg shadow-tag-yellow/20"
          : "border-white/10 bg-black/20 hover:border-tag-yellow/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
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
          <div
            className={`mb-2 text-3xl transition-transform duration-200 ${
              isDragging ? "scale-125" : ""
            }`}
          >
            {isDragging ? "📥" : "📁"}
          </div>
          <p className="text-sm font-semibold text-white">
            {isDragging ? "Drop it here!" : label}
          </p>
          <p className="text-xs text-gray-400">{sublabel}</p>
        </>
      )}
    </div>
  );
}
