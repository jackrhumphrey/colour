"use client";

import { useState } from "react";
import Controls from "./controls";
import Output from "./output";

export default function Display({ initColours }: { initColours: string[] }) {
  const [colours, setColours] = useState(initColours);
  const [steps, setSteps] = useState(3);
  const [colorSpace, setColorSpace] = useState("oklab");
  const [interpolationMethod, setInterpolationMethod] = useState("");

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
