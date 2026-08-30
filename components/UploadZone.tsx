"use client";

import { useCallback, useState } from "react";

interface UploadZoneProps {
  accept: string;
  label: string;
  sublabel: string;
  onFileSelect: (url: string) => void;
  preview: string | null;
  multiple?: boolean;
  onMultipleSelect?: (urls: string[]) => void;
}

export default function UploadZone({
  accept,
  label,
  sublabel,
  onFileSelect,
  preview,
  multiple = false,
  onMultipleSelect,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [extraCount, setExtraCount] = useState(0);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const imageFiles = fileArray.filter((f) => f.type.startsWith("image/"));

      if (imageFiles.length === 0) return;

      if (multiple && onMultipleSelect && imageFiles.length > 1) {
        // Read all images
        Promise.all(
          imageFiles.map(
            (file) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
              })
          )
        ).then((urls) => {
          onMultipleSelect(urls);
          setExtraCount(0);
        });
      } else {
        // Single file mode (or only one image dropped)
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onFileSelect(e.target.result as string);
            setExtraCount(Math.max(0, imageFiles.length - 1));
          }
        };
        reader.readAsDataURL(imageFiles[0]);
      }
    },
    [multiple, onFileSelect, onMultipleSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
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
        multiple={multiple}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />

      {preview ? (
        <div>
          <img
            src={preview}
            alt="Preview"
            className="mx-auto h-24 w-full rounded-lg object-contain"
          />
          {extraCount > 0 && (
            <p className="mt-2 text-xs text-tag-yellow">
              +{extraCount} more file{extraCount > 1 ? "s" : ""} ignored — batch coming soon
            </p>
          )}
        </div>
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
