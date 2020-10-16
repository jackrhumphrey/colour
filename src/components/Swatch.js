import * as React from "react";

import "./Swatch.css";

function Swatch({ colour }) {
  return (
    <div className="swatch" style={{ background: colour }}>
      <div
        className={`text ${
          parseInt(colour.substr(1, 2), 16) +
            parseInt(colour.substr(3, 2), 16) +
            parseInt(colour.substr(5, 2), 16) <
          384
            ? "white"
            : "black"
        }`}
      >
        {colour}
      </div>
    </div>
  );
}

export default Swatch;
