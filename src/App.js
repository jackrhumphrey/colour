import * as React from "react";

import "normalize.css";
import "./components/index.css";

function App() {
  const [colours, setColours] = React.useState({
    colour1: "#000000",
    colour2: "#000000",
    swatches: [],
  });

  const updateColour1 = React.useCallback((e) => {
    setColours({
      ...colours,
      colour1: e.target.value,
    });
  }, [colours]);

  const updateColour2 = React.useCallback((e) => {
    setColours({
      ...colours,
      colour2: e.target.value,
    });
  }, [colours]);

  const addToSwatches = React.useCallback((e) => {
    console.log("addtoswatches");

    setColours({
      ...colours,
      swatches: [...colours.swatches, e],
    });
  }, [colours]);

  const average = React.useCallback((c1, c2) => {
    console.log("average");

    var c1red = parseInt(c1.substr(1, 2), 16);
    var c2red = parseInt(c2.substr(1, 2), 16);
    var red = (c1red + c2red) / 2;
    var redhex = Math.round(red).toString(16);
    if (redhex.length === 1) {
      redhex = "0" + redhex;
    }

    var c1green = parseInt(c1.substr(3, 2), 16);
    var c2green = parseInt(c2.substr(3, 2), 16);
    var green = (c1green + c2green) / 2;
    var greenhex = Math.round(green).toString(16);
    if (greenhex.length === 1) {
      greenhex = "0" + greenhex;
    }

    var c1blue = parseInt(c1.substr(5, 2), 16);
    var c2blue = parseInt(c2.substr(5, 2), 16);
    var blue = (c1blue + c2blue) / 2;
    var bluehex = Math.round(blue).toString(16);
    if (bluehex.length === 1) {
      bluehex = "0" + bluehex;
    }

    var hex = "#" + redhex + greenhex + bluehex;

    addToSwatches(hex);
  }, [addToSwatches]);

  return (
    <div id="container">
      <input type="color"
        value={colours.colour1}
        id="colour1"
        onChange={(e) => updateColour1(e)}
      />{" "}
      {colours.swatches.map((swatch) => {
        return <div> {swatch} </div>;
      })}{" "}
      {/* return <Image key={swatch.id} swatch={swatch} /> */}
      <input
        type="color"
        value={colours.colour2}
        id="colour2"
        onChange={(e) => updateColour2(e)}
      />{" "}
      <input
        type="button"
        value="Average"
        onClick={(e) => average(colours.colour1, colours.colour2)}
      />{" "}
    </div>
  );
}

export default App;
