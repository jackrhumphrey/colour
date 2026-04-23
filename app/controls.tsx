"use client";

import React, { useState, useEffect, useDeferredValue } from "react";

interface ControlsProps {
  colours: string[];
  setColours: React.Dispatch<React.SetStateAction<string[]>>;
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  colorSpace: string;
  setColorSpace: React.Dispatch<React.SetStateAction<string>>;
  interpolationMethod?: string;
  setInterpolationMethod: React.Dispatch<React.SetStateAction<string>>;
}

export default function Controls({
  colours,
  setColours,
  steps,
  setSteps,
  colorSpace,
  setColorSpace,
  interpolationMethod,
  setInterpolationMethod,
}: ControlsProps) {
  const [colourInputs, setColourInputs] = useState(colours);
  const deferredColourInputs = useDeferredValue(colourInputs);

  useEffect(() => {
    setColourInputs(colours);
  }, [colours]);

  useEffect(() => {
    const newColours = deferredColourInputs.map((hex, index) => {
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        return hex;
      }
      return colours[index];
    });

    if (newColours.some((c, i) => c !== colours[i])) {
      setColours(newColours);
    }
  }, [deferredColourInputs, colours]);

  useEffect(() => {
    if (
      colorSpace === "hsl" ||
      colorSpace === "hwb" ||
      colorSpace === "lch" ||
      colorSpace === "oklch"
    ) {
      setInterpolationMethod((prev) => prev || "shorter hue");
    } else {
      setInterpolationMethod("");
    }
  }, [colorSpace]);

  return (
    <div className="controls">
      <div className="controls__grid">
        <label className="controls__label" htmlFor="colour1" id="colour1-label">
          Colour 1
        </label>
        <div className="controls__input-group">
          <input
            type="color"
            id="colour1"
            name="colour1"
            value={colours[0]}
            onChange={(e) => {
              setColourInputs((prev) => [e.target.value, prev[1]]);
            }}
          />
          <input
            id="colour1-text"
            name="colour1-text"
            aria-labelledby="colour1-label"
            value={colourInputs[0]}
            maxLength={7}
            style={{ width: "6em" }}
            onChange={(e) => {
              setColourInputs((prev) => [e.target.value, prev[1]]);
            }}
            onBlur={(e) => {
              setColourInputs((prev) => [colours[0], prev[1]]);
            }}
          />
        </div>
        <label className="controls__label" htmlFor="colour2" id="colour2-label">
          Colour 2
        </label>
        <div className="controls__input-group">
          <input
            type="color"
            id="colour2"
            name="colour2"
            value={colours[1]}
            onChange={(e) => {
              setColourInputs((prev) => [prev[0], e.target.value]);
            }}
          />
          <input
            id="colour2-text"
            name="colour2-text"
            aria-labelledby="colour2-label"
            value={colourInputs[1]}
            maxLength={7}
            style={{ width: "6em" }}
            onChange={(e) => {
              setColourInputs((prev) => [prev[0], e.target.value]);
            }}
            onBlur={(e) => {
              setColourInputs((prev) => [prev[0], colours[1]]);
            }}
          />
        </div>
        <label className="controls__label" htmlFor="steps">
          Steps
        </label>
        <div>
          <input
            type="number"
            id="steps"
            name="steps"
            min="1"
            style={{ width: "6em" }}
            value={steps}
            onChange={(e) => {
              if (Number(e.target.value) > 0) {
                setSteps(Number(e.target.value));
              }
            }}
          />
        </div>
        <label className="controls__label" htmlFor="color-space">
          Colour&nbsp;space
        </label>
        <div style={{ padding: "1px 0" }}>
          <select
            id="color-space"
            name="color-space"
            value={colorSpace}
            onChange={(e) => {
              setColorSpace(e.target.value);
            }}
          >
            <option value="srgb">srgb</option>
            <option value="srgb-linear">srgb-linear</option>
            <option value="lab">lab</option>
            <option value="oklab">oklab</option>
            <option value="xyz-d50">xyz-d50</option>
            <option value="xyz-d65">xyz-d65</option>
            <option value="hsl">hsl</option>
            <option value="hwb">hwb</option>
            <option value="lch">lch</option>
            <option value="oklch">oklch</option>
          </select>
        </div>
        <label
          style={{ visibility: interpolationMethod ? "visible" : "hidden" }}
          className="controls__label"
          htmlFor="interpolation-method"
        >
          Interpolation method
        </label>
        <div
          style={{
            visibility: interpolationMethod ? "visible" : "hidden",
            padding: "1px 0",
          }}
        >
          <select
            id="interpolation-method"
            name="interpolation-method"
            value={interpolationMethod}
            onChange={(e) => {
              setInterpolationMethod(e.target.value);
            }}
          >
            <option value="shorter hue">shorter hue</option>
            <option value="longer hue">longer hue</option>
            <option value="increasing hue">increasing hue</option>
            <option value="decreasing hue">decreasing hue</option>
          </select>
        </div>
      </div>
    </div>
  );
}
