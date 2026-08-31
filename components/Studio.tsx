"use client";

import { useState, useCallback, useRef } from "react";
import UploadZone from "./UploadZone";
import Controls from "./Controls";
import CanvasEditor from "./CanvasEditor";
import { WatermarkSettings } from "@/lib/watermark";
import { IMAGE_ACCEPT, IMAGE_ACCEPT_LABEL } from "@/lib/site";
import { removeImageBackground } from "@/lib/remove-bg";

export default function Studio() {
  const [logo, setLogo] = useState<string | null>(null);
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);
  const [removeBg, setRemoveBg] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bgError, setBgError] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [mediaList, setMediaList] = useState<string[]>([]);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  const [settings, setSettings] = useState<WatermarkSettings>({
    position: "br",
    size: 15,
    opacity: 0.85,
    rotation: 0,
    padding: 20,
    tiled: false,
    shadow: true,
    textWatermark: "",
    textColor: "#ffffff",
    textSize: 16,
    exportFormat: "image/png",
    exportQuality: 0.92,
  });

  const updateSetting = useCallback(
    <K extends keyof WatermarkSettings>(key: K, value: WatermarkSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const processLogo = useCallback(async (source: string, shouldRemove: boolean) => {
    setBgError(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    if (!shouldRemove) {
      setProcessedLogo(source);
      return;
    }

    setIsProcessing(true);
    try {
      const url = await removeImageBackground(source);
      objectUrlRef.current = url;
      setProcessedLogo(url);
    } catch (err) {
      console.error("Background removal failed:", err);
      setProcessedLogo(source);
      setBgError(
        err instanceof Error
          ? err.message
          : "Could not remove background. Using the original image."
      );
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleLogoSelect = useCallback(
    (url: string) => {
      setLogo(url);
      processLogo(url, removeBg);
    },
    [removeBg, processLogo]
  );

  const handleToggleRemoveBg = useCallback(
    (checked: boolean) => {
      setRemoveBg(checked);
      if (logo) processLogo(logo, checked);
    },
    [logo, processLogo]
  );

  const handleSingleMediaSelect = useCallback((url: string) => {
    setMediaList([url]);
    setActiveMediaIndex(0);
  }, []);

  const handleMultipleMediaSelect = useCallback((urls: string[]) => {
    setMediaList(urls);
    setActiveMediaIndex(0);
  }, []);

  const activeMedia = mediaList[activeMediaIndex] || null;
  const finalLogo = processedLogo || logo;
  const hasWatermarkSource =
    !!finalLogo || (!!settings.textWatermark && settings.textWatermark.trim() !== "");
  const activeStep = hasWatermarkSource && activeMedia ? 3 : hasWatermarkSource ? 1 : activeMedia ? 2 : 0;

  const steps = [
    { id: 1, label: "Upload Logo/Text" },
    { id: 2, label: "Upload Media" },
    { id: 3, label: "Position & Presets" },
    { id: 4, label: "Edit & Preview" },
    { id: 5, label: "Batch Export" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="my-8 flex flex-wrap justify-center gap-3">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-md transition-all ${
              i <= activeStep + 1
                ? "border-tag-yellow bg-tag-yellow/10 text-white shadow-lg shadow-tag-yellow/10"
                : "border-white/10 bg-tag-surface text-gray-500"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-extrabold ${
                i <= activeStep + 1
                  ? "bg-tag-yellow text-black"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {step.id}
            </span>
            {step.label}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
              1. Logo watermark
            </h3>

            <UploadZone
              accept={IMAGE_ACCEPT}
              label="Drop logo here"
              sublabel={`${IMAGE_ACCEPT_LABEL} · vectors as SVG`}
              onFileSelect={handleLogoSelect}
              preview={finalLogo}
            />

            {logo && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">Remove background</p>
                  <p className="text-xs text-gray-400">Works on any uploaded image · stays in your browser</p>
                </div>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={removeBg}
                    onChange={(e) => handleToggleRemoveBg(e.target.checked)}
                    disabled={isProcessing}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-tag-yellow peer-checked:after:translate-x-full peer-disabled:opacity-50"></div>
                </label>
              </div>
            )}

            {isProcessing && (
              <p className="mt-3 text-center text-xs text-tag-yellow animate-pulse">
                Removing background… first run downloads a small on-device model.
              </p>
            )}
            {bgError && (
              <p className="mt-3 text-center text-xs font-semibold text-red-400">{bgError}</p>
            )}
          </div>

          <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
              2. Media files (single or batch)
            </h3>
            <UploadZone
              accept={IMAGE_ACCEPT}
              label="Drop images here"
              sublabel={`${IMAGE_ACCEPT_LABEL} · select multiple for batch`}
              onFileSelect={handleSingleMediaSelect}
              onMultipleSelect={handleMultipleMediaSelect}
              preview={activeMedia}
              multiple={true}
              fileCount={mediaList.length}
            />
          </div>

          <Controls
            settings={settings}
            onChange={updateSetting}
            disabled={!hasWatermarkSource || !activeMedia}
          />
        </div>

        <div>
          <CanvasEditor
            logo={finalLogo}
            media={activeMedia}
            mediaList={mediaList}
            activeMediaIndex={activeMediaIndex}
            onSelectMediaIndex={setActiveMediaIndex}
            settings={settings}
          />
        </div>
      </div>
    </div>
  );
}
