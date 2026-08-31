"use client";

import { useCallback, useState } from "react";

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB max

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/avif",
]);

interface UploadZoneProps {
  accept: string;
  label: string;
  sublabel: string;
  onFileSelect: (url: string) => void;
  preview: string | null;
  multiple?: boolean;
  onMultipleSelect?: (urls: string[]) => void;
  fileCount?: number;
}

export default function UploadZone({
  accept,
  label,
  sublabel,
  onFileSelect,
  preview,
  multiple = false,
  onMultipleSelect,
  fileCount = 1,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setErrorMessage(null);
      const fileArray = Array.from(files);

      const validImageFiles = fileArray.filter((f) => {
        if (!f.type || !ALLOWED_MIME_TYPES.has(f.type.toLowerCase())) {
          return false;
        }
        return true;
      });

      if (validImageFiles.length === 0) {
        setErrorMessage("Please upload valid image files (PNG, JPG, WebP, SVG).");
        return;
      }

      const oversizedFiles = validImageFiles.filter((f) => f.size > MAX_FILE_SIZE_BYTES);
      if (oversizedFiles.length > 0) {
        setErrorMessage(`File exceeds max size of 25MB (${oversizedFiles[0].name}).`);
        return;
      }

      if (multiple && onMultipleSelect && validImageFiles.length > 1) {
        Promise.all(
          validImageFiles.map(
            (file) =>
              new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  if (e.target?.result) {
                    resolve(e.target.result as string);
                  } else {
                    reject(new Error("Failed to read file"));
                  }
                };
                reader.onerror = () => reject(new Error("File reading error"));
                reader.readAsDataURL(file);
              })
          )
        )
          .then((urls) => {
            onMultipleSelect(urls);
          })
          .catch(() => {
            setErrorMessage("An error occurred while reading the files.");
          });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onFileSelect(e.target.result as string);
          }
        };
        reader.onerror = () => {
          setErrorMessage("Failed to read the uploaded image.");
        };
        reader.readAsDataURL(validImageFiles[0]);
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
      if (e.dataTransfer.files) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  return (
    <div className="space-y-2">
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
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              processFiles(e.target.files);
              e.target.value = "";
            }
          }}
        />

        {preview ? (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-24 w-full rounded-lg object-contain"
            />
            {fileCount > 1 && (
              <p className="mt-2 text-xs font-semibold text-tag-yellow">
                📁 {fileCount} items loaded (Batch mode)
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

      {errorMessage && (
        <p className="text-center text-xs font-semibold text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
