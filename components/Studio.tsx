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
  const [logo, setLogo] = useState<string | null>(null);                 // original
  const [processedLogo, setProcessedLogo] = useState<string | null>(null); // transparent
  const [removeBg, setRemoveBg] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const processLogo = useCallback(async (source: string, shouldRemove: boolean) => {
    setError(null);

    if (!shouldRemove) {
      setProcessedLogo(source);
      return;
    }

    setIsProcessing(true);
    try {
      const bgRemoval = await import("@imgly/background-removal");
      const blob = await bgRemoval.removeBackground(source);
      const url = URL.createObjectURL(blob);
      setProcessedLogo(url);
    } catch (err) {
      console.error("Background removal failed:", err);
      setError("Could not remove background. Try a logo with a simpler background.");
      setProcessedLogo(source); // fallback
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleLogoSelect = useCallback(
    (url: string) => {
      setLogo(url);
      setProcessedLogo(null);
      setError(null);
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

  const handleRetry = useCallback(() => {
    if (logo) processLogo(logo, true);
  }, [logo, processLogo]);

  const finalLogo = processedLogo || logo;
  const activeStep = finalLogo && media ? 3 : finalLogo ? 1 : media ? 2 : 0;

  const steps = [
    { id: 1, label: "Upload Logo" },
    { id: 2, label: "Upload Media" },
    { id: 3, label: "Position" },
    { id: 4, label: "Edit & Preview" },
    { id: 5, label: "Download" },
  ];

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
          {/* Logo Section */}
          <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
              🏷️ 1. Your Logo
            </h3>

            <UploadZone
              accept="image/png,image/svg+xml,image/webp,image/jpeg"
              label="Drop logo here"
              sublabel="PNG, SVG, WebP, JPG"
              onFileSelect={handleLogoSelect}
              preview={finalLogo}
            />

            {/* Toggle + Controls */}
            {logo && (
              <div className="mt-4 space-y-3">
                {/* Toggle */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
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

                {/* Loading */}
                {isProcessing && (
                  <div className="rounded-xl border border-tag-yellow/30 bg-tag-yellow/5 px-4 py-3 text-center">
                    <p className="text-sm font-medium text-tag-yellow animate-pulse">
                      Removing background…
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      First time may take a few seconds (downloading model)
                    </p>
                  </div>
                )}

                {/* Error + Retry */}
                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <p className="text-sm text-red-400">{error}</p>
                    <button
                      onClick={handleRetry}
                      className="mt-2 text-xs font-bold text-tag-yellow hover:underline"
                    >
                      ↺ Try again
                    </button>
                  </div>
                )}

                {/* Side-by-side comparison */}
                {removeBg && processedLogo && logo && !isProcessing && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/10 bg-black/40 p-2 text-center">
                      <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">
                        Original
                      </p>
                      <img
                        src={logo}
                        alt="Original"
                        className="mx-auto h-16 object-contain"
                      />
                    </div>
                    <div className="rounded-lg border border-tag-yellow/40 bg-black/40 p-2 text-center">
                      <p className="mb-1 text-[10px] uppercase tracking-wider text-tag-yellow">
                        Transparent
                      </p>
                      <img
                        src={processedLogo}
                        alt="Transparent"
                        className="mx-auto h-16 object-contain"
                        style={{
                          background:
                            "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 12px 12px",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
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
              sublabel="JPG, PNG, WebP"
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

        {/* Canvas */}
        <div>
          <CanvasEditor logo={finalLogo} media={media} settings={settings} />
        </div>
      </div>
    </div>
  );
}
