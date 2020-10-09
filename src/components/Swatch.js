import * as React from "react";

import "./Swatch.css";

function Swatch({colour}) {
    return (
        <div style={{background:colour}}>{colour}</div>
    );
}

export default Swatch;