"use client";

import Color from "colorjs.io";

interface SwatchProps {
  color: string;
  label: string;
  ref?: (element: HTMLDivElement | null) => void;
}

export default function Swatch({ color, label, ref }: SwatchProps) {
  const getTextColor = () => {
    if (!label) return undefined;
    try {
      const bgColor = new Color(label);
      const white = new Color("#fff");
      const black = new Color("#000");

      const contrastWhite = bgColor.contrast(white, "WCAG21");
      const contrastBlack = bgColor.contrast(black, "WCAG21");

      return contrastWhite > contrastBlack ? "#fff" : "#000";
    } catch {
      return undefined;
    }
  };

  return (
    <div
      className="swatch"
      style={{ backgroundColor: color, color: getTextColor() }}
      ref={ref}
    >
      {label}
    </div>
  );
}
