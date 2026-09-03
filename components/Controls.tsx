"use client";

import { WatermarkSettings } from "@/lib/watermark";

interface ControlsProps {
  settings: WatermarkSettings;
  onChange: <K extends keyof WatermarkSettings>(
    key: K,
    value: WatermarkSettings[K]
  ) => void;
  disabled: boolean;
}

const positions = [
  { key: "tl", icon: "↖️" },
  { key: "tc", icon: "⬆️" },
  { key: "tr", icon: "↗️" },
  { key: "ml", icon: "⬅️" },
  { key: "mc", icon: "🎯" },
  { key: "mr", icon: "➡️" },
  { key: "bl", icon: "↙️" },
  { key: "bc", icon: "⬇️" },
  { key: "br", icon: "↘️" },
];

const positionLabels: Record<string, string> = {
  tl: "Top-Left",
  tc: "Top-Center",
  tr: "Top-Right",
  ml: "Mid-Left",
  mc: "Center",
  mr: "Mid-Right",
  bl: "Bottom-Left",
  bc: "Bottom-Center",
  br: "Bottom-Right",
};

export default function Controls({ settings, onChange, disabled }: ControlsProps) {
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case "corner":
        onChange("position", "br");
        onChange("size", 15);
        onChange("opacity", 0.9);
        onChange("rotation", 0);
        onChange("padding", 20);
        onChange("tiled", false);
        onChange("shadow", true);
        break;
      case "center":
        onChange("position", "mc");
        onChange("size", 25);
        onChange("opacity", 0.85);
        onChange("rotation", 0);
        onChange("padding", 20);
        onChange("tiled", false);
        onChange("shadow", true);
        break;
      case "subtle":
        onChange("position", "br");
        onChange("size", 12);
        onChange("opacity", 0.45);
        onChange("rotation", 0);
        onChange("padding", 15);
        onChange("tiled", false);
        onChange("shadow", false);
        break;
      case "tiled":
        onChange("position", "mc");
        onChange("size", 18);
        onChange("opacity", 0.35);
        onChange("rotation", -30);
        onChange("padding", 30);
        onChange("tiled", true);
        onChange("shadow", false);
        break;
    }
  };

  return (
    <div
      className={`rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl transition-opacity ${
        disabled ? "pointer-events-none opacity-40" : "opacity-100"
      }`}
    >
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
        ⚙️ 3. Presets & Controls
      </h3>

      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Quick Presets
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => applyPreset("corner")}
            className="rounded-lg border border-white/10 bg-white/5 py-2 px-2 font-semibold text-gray-300 hover:border-tag-yellow hover:text-tag-yellow transition-all"
          >
            📌 Corner Badge
          </button>
          <button
            type="button"
            onClick={() => applyPreset("center")}
            className="rounded-lg border border-white/10 bg-white/5 py-2 px-2 font-semibold text-gray-300 hover:border-tag-yellow hover:text-tag-yellow transition-all"
          >
            🎯 Center Stamp
          </button>
          <button
            type="button"
            onClick={() => applyPreset("subtle")}
            className="rounded-lg border border-white/10 bg-white/5 py-2 px-2 font-semibold text-gray-300 hover:border-tag-yellow hover:text-tag-yellow transition-all"
          >
            👻 Subtle Overlay
          </button>
          <button
            type="button"
            onClick={() => applyPreset("tiled")}
            className="rounded-lg border border-white/10 bg-white/5 py-2 px-2 font-semibold text-gray-300 hover:border-tag-yellow hover:text-tag-yellow transition-all"
          >
            🏁 Diagonal Tile
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-white/10 bg-black/30 p-3">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tag-yellow">
          ✍️ Optional Text Watermark
        </label>
        <input
          type="text"
          placeholder="e.g. @yourbrand or © 2026"
          value={settings.textWatermark || ""}
          onChange={(e) => onChange("textWatermark", e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-tag-yellow focus:outline-none"
        />

        {settings.textWatermark && settings.textWatermark.trim() !== "" && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] uppercase text-gray-400">Color</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={settings.textColor || "#ffffff"}
                  onChange={(e) => onChange("textColor", e.target.value)}
                  className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs text-gray-300 font-mono">
                  {settings.textColor || "#ffffff"}
                </span>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase text-gray-400">Font Size</label>
              <input
                type="number"
                min={10}
                max={50}
                value={settings.textSize || 16}
                onChange={(e) => onChange("textSize", Number(e.target.value))}
                className="mt-1 w-full rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-white"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-5">
        <label className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
          Position
          <span className="text-tag-yellow">{positionLabels[settings.position]}</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {positions.map((pos) => (
            <button
              key={pos.key}
              onClick={() => onChange("position", pos.key)}
              className={`flex aspect-square items-center justify-center rounded-lg border text-lg transition-all ${
                settings.position === pos.key
                  ? "border-transparent bg-gradient-to-br from-tag-yellow to-tag-green font-bold text-black"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-tag-yellow/50 hover:text-tag-yellow"
              }`}
            >
              {pos.icon}
            </button>
          ))}
        </div>
      </div>

      <Slider
        label="Size"
        value={settings.size}
        min={5}
        max={50}
        suffix="%"
        onChange={(v) => onChange("size", v)}
      />
      <Slider
        label="Opacity"
        value={Math.round(settings.opacity * 100)}
        min={10}
        max={100}
        suffix="%"
        onChange={(v) => onChange("opacity", v / 100)}
      />
      <Slider
        label="Rotation"
        value={settings.rotation}
        min={-180}
        max={180}
        suffix="°"
        onChange={(v) => onChange("rotation", v)}
      />
      <Slider
        label="Padding"
        value={settings.padding}
        min={0}
        max={100}
        suffix="px"
        onChange={(v) => onChange("padding", v)}
      />

      <Toggle
        label="Tiled (repeat)"
        checked={settings.tiled}
        onChange={(v) => onChange("tiled", v)}
      />
      <Toggle
        label="Shadow"
        checked={settings.shadow}
        onChange={(v) => onChange("shadow", v)}
      />

      <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tag-yellow">
          💾 Export Options
        </label>
        <div className="grid grid-cols-3 gap-1">
          {[
            { label: "PNG", value: "image/png" },
            { label: "JPG", value: "image/jpeg" },
            { label: "WebP", value: "image/webp" },
          ].map((fmt) => (
            <button
              key={fmt.value}
              type="button"
              onClick={() => onChange("exportFormat", fmt.value)}
              className={`rounded py-1 text-xs font-bold transition-all ${
                (settings.exportFormat || "image/png") === fmt.value
                  ? "bg-tag-yellow text-black"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {settings.exportFormat !== "image/png" && (
          <div className="mt-3">
            <Slider
              label="Quality"
              value={Math.round((settings.exportQuality || 0.92) * 100)}
              min={50}
              max={100}
              suffix="%"
              onChange={(v) => onChange("exportQuality", v / 100)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (val: number) => void;
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
        <span className="text-tag-yellow">
          {value}
          {suffix}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="peer h-6 w-11 rounded-full bg-white/10 transition-colors peer-checked:bg-gradient-to-r peer-checked:from-tag-yellow peer-checked:to-tag-green" />
        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </label>
    </div>
  );
}
