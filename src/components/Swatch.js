import * as React from "react";

import "./Swatch.css";

function Swatch({ colour }) {
  function blackOrWhite(colour) {
    var color = colour.charAt(0) === "#" ? colour.substring(1, 7) : colour;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map(col => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? "black" : "white";
  }

  return (
    <div className="swatch" style={{ background: colour }}>
      <div className={`text ${blackOrWhite(colour)}`}>
        {colour}
      </div>
    </div>
  );
}

export default Swatch;
