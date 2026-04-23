"use client";

import { useState, useEffect } from "react";
import Controls from "./controls";
import Output from "./output";

export default function Display() {
  const [colours, setColours] = useState<string[]>([]);

  useEffect(() => {
    const toHex = (number: number) => {
      let hex = number.toString(16);
      while (hex.length < 6) {
        hex = "0" + hex;
      }
      return "#" + hex;
    };
    setColours([
      toHex(Math.floor(Math.random() * 16777215)),
      toHex(Math.floor(Math.random() * 16777215)),
    ]);
  }, []);

  const [steps, setSteps] = useState(3);
  const [colorSpace, setColorSpace] = useState("oklab");
  const [interpolationMethod, setInterpolationMethod] = useState("");

  if (!colours[0]) {
    return null;
  }

  return (
    <div className="display">
      <Controls
        colours={colours}
        setColours={setColours}
        steps={steps}
        setSteps={setSteps}
        colorSpace={colorSpace}
        setColorSpace={setColorSpace}
        interpolationMethod={interpolationMethod || undefined}
        setInterpolationMethod={setInterpolationMethod}
      />
      <Output
        colours={colours}
        steps={steps}
        colorSpace={colorSpace}
        interpolationMethod={interpolationMethod || undefined}
      />
    </div>
  );
}
