"use client";

import Swatch from "./swatch";

import { useRef, useState, useEffect } from "react";
import Color from "colorjs.io";

interface OutputProps {
  colours: string[];
  steps: number;
  colorSpace: string;
  interpolationMethod?: string;
}

export default function Output({
  colours,
  steps,
  colorSpace,
  interpolationMethod,
}: OutputProps) {
  const [swatches, setSwatches] = useState([""]);

  const getColour = (index: number) => {
    const percent = (index / (steps + 1)) * 100;
    return `color-mix(in ${colorSpace}  ${interpolationMethod || ""}, ${colours[0]} ${100 - percent}%, ${colours[1]} ${percent}%)`;
  };

  const getHex = (index: number) => {
    if (!swatches[index]) return "";
    let color = new Color(swatches[index]);
    return color.toString({ format: "hex" });
  };

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevColorsRef = useRef<string[] | null>(null);

  useEffect(() => {
    if (itemRefs.current.length === 0) return;

    itemRefs.current.length = steps + 2;

    const currentColors = itemRefs.current.map((item) => {
      return getComputedStyle(item!).backgroundColor;
    });

    const colorsChanged =
      !prevColorsRef.current ||
      currentColors.some((color, i) => color !== prevColorsRef.current?.[i]);

    if (colorsChanged) {
      prevColorsRef.current = currentColors;
      setSwatches(currentColors);
    }
  }, [steps, colorSpace, interpolationMethod, colours]);

  return (
    <div className="output">
      {Array.from({ length: steps + 2 }, (_, i) => (
        <Swatch
          key={i}
          color={getColour(i)}
          label={getHex(i)}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
