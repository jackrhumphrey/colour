import * as React from "react";

import "./Swatch.css";

function Swatch({colour}) {

    return (
        <div className={`swatch ${parseInt(colour.substr(1, 2), 16) + parseInt(colour.substr(3, 2), 16) +parseInt(colour.substr(5, 2), 16) < 384 ? "white" : "black"}`} style={{background:colour}}>{colour}</div>
    );
}

export default Swatch;