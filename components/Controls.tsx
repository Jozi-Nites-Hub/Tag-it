"use client";

import { WatermarkSettings } from "./Studio";

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
  return (
    <div
      className={`rounded-2xl border border-tag-yellow/20 bg-tag-surface p-5 backdrop-blur-xl transition-opacity ${
        disabled ? "pointer-events-none opacity-40" : "opacity-100"
      }`}
    >
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-tag-yellow">
        ⚙️ 3. Adjustments
      </h3>

      {/* Position Grid */}
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

      {/* Sliders */}
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

      {/* Toggles */}
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
