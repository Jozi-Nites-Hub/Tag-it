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
  const [logo, setLogo] = useState<string | null>(null);
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

  const activeStep = logo && media ? 3 : logo ? 1 : media ? 2 : 0;

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
          <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
              🏷️ 1. Your Logo
            </h3>
            <UploadZone
              accept="image/png,image/svg+xml,image/webp"
              label="Drop logo here"
              sublabel="PNG, SVG, WebP (transparent best)"
              onFileSelect={setLogo}
              preview={logo}
            />
          </div>

          <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
              🖼️ 2. Your Media
            </h3>
            <UploadZone
              accept="image/*,video/*"
              label="Drop image or video"
              sublabel="JPG, PNG, MP4, MOV"
              onFileSelect={setMedia}
              preview={media}
            />
          </div>

          <Controls
            settings={settings}
            onChange={updateSetting}
            disabled={!logo || !media}
          />
        </div>

        {/* Canvas Area */}
        <div>
          <CanvasEditor
            logo={logo}
            media={media}
            settings={settings}
          />
        </div>
      </div>
    </div>
  );
}
