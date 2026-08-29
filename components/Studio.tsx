"use client";

import { useState, useCallback } from "react";
import UploadZone from "./UploadZone";
import Controls from "./Controls";
import CanvasEditor from "./CanvasEditor";

export type WatermarkSettings = {
  position: string;
  size: number;
  opacity: number;
  rotation: number;
  padding: number;
  tiled: boolean;
  shadow: boolean;
};

export default function Studio() {
  const [logo, setLogo] = useState<string | null>(null);           // original
  const [processedLogo, setProcessedLogo] = useState<string | null>(null); // transparent version
  const [removeBg, setRemoveBg] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [media, setMedia] = useState<string | null>(null);

  const [settings, setSettings] = useState<WatermarkSettings>({
    position: "br",
    size: 15,
    opacity: 0.85,
    rotation: 0,
    padding: 20,
    tiled: false,
    shadow: true,
  });

  const updateSetting = useCallback(
    <K extends keyof WatermarkSettings>(key: K, value: WatermarkSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Process logo when toggle changes or new logo is uploaded
  const processLogo = useCallback(async (source: string, shouldRemove: boolean) => {
    if (!shouldRemove) {
      setProcessedLogo(source);
      return;
    }

    setIsProcessing(true);
    try {
      // Dynamic import so it only loads when needed
      const { removeBackground } = await import("@imgly/background-removal");
      
      const blob = await removeBackground(source, {
        // Optional: you can tweak these
        // model: "small", // faster, slightly lower quality
        // output: { format: "image/png", quality: 0.9 }
      });

      const url = URL.createObjectURL(blob);
      setProcessedLogo(url);
    } catch (err) {
      console.error("Background removal failed:", err);
      // Fallback to original
      setProcessedLogo(source);
      alert("Could not remove background. Using original logo.");
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
      if (logo) {
        processLogo(logo, checked);
      }
    },
    [logo, processLogo]
  );

  const activeStep = (processedLogo || logo) && media ? 3 : (processedLogo || logo) ? 1 : media ? 2 : 0;

  const steps = [
    { id: 1, label: "Upload Logo" },
    { id: 2, label: "Upload Media" },
    { id: 3, label: "Position" },
    { id: 4, label: "Edit & Preview" },
    { id: 5, label: "Download" },
  ];

  // The logo that actually gets used on the canvas
  const finalLogo = processedLogo || logo;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      {/* Steps */}
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

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Logo Upload */}
          <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
              🏷️ 1. Your Logo
            </h3>

            <UploadZone
              accept="image/png,image/svg+xml,image/webp,image/jpeg"
              label="Drop logo here"
              sublabel="PNG, SVG, WebP, JPG (transparent best)"
              onFileSelect={handleLogoSelect}
              preview={finalLogo}
            />

            {/* Remove Background Toggle */}
            {logo && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">Remove background</p>
                  <p className="text-xs text-gray-400">Make logo transparent</p>
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
                Removing background… (first time may take a few seconds)
              </p>
            )}
          </div>

          {/* Media Upload */}
          <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
              🖼️ 2. Your Media
            </h3>
            <UploadZone
              accept="image/*"
              label="Drop image here"
              sublabel="JPG, PNG, WebP — multiple allowed"
              onFileSelect={setMedia}
              preview={media}
              multiple={true}
            />
          </div>

          <Controls
            settings={settings}
            onChange={updateSetting}
            disabled={!finalLogo || !media}
          />
        </div>

        {/* Canvas Area */}
        <div>
          <CanvasEditor
            logo={finalLogo}
            media={media}
            settings={settings}
          />
        </div>
      </div>
    </div>
  );
      }
