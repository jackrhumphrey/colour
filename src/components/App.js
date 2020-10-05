import * as React from "react";

import "./App.css";

function App() {
  const [colours, setColours] = React.useState({
    colour1: "#000000",
    colour2: "#000000",
    swatches: []
  });

  const updateColour1 = React.useCallback(
    e => {
      setColours({
        ...colours,
        colour1: e.target.value
      });
    },
    [colours]
  );

  const updateColour2 = React.useCallback(
    e => {
      setColours({
        ...colours,
        colour2: e.target.value
      });
    },
    [colours]
  );

  const addToSwatches = React.useCallback(
    swatches => {
      console.log(swatches);

      setColours({
        ...colours,
        swatches: [...swatches]
      });

    },
    [colours]
  );

  const average = React.useCallback(
    (c1, c2, n) => {
      console.log("average");

      var c1red = parseInt(c1.substr(1, 2), 16);
      var c2red = parseInt(c2.substr(1, 2), 16);
      var c1green = parseInt(c1.substr(3, 2), 16);
      var c2green = parseInt(c2.substr(3, 2), 16);
      var c1blue = parseInt(c1.substr(5, 2), 16);
      var c2blue = parseInt(c2.substr(5, 2), 16);
      var swatches = [];

      for (var i = 1; i < n + 1; i++) {
        var red = ((c1red + c2red) / (n + 1)) * i;
        var redhex = Math.round(red).toString(16);
        if (redhex.length === 1) {
          redhex = "0" + redhex;
        }

        var green = ((c1green + c2green) / (n + 1)) * i;
        var greenhex = Math.round(green).toString(16);
        if (greenhex.length === 1) {
          greenhex = "0" + greenhex;
        }

        var blue = ((c1blue + c2blue) / (n + 1)) * i;
        var bluehex = Math.round(blue).toString(16);
        if (bluehex.length === 1) {
          bluehex = "0" + bluehex;
        }

        var hex = "#" + redhex + greenhex + bluehex;

        swatches = [...swatches, hex]

        addToSwatches(swatches);
      }
    },
    [addToSwatches]
  );

  return (
    <div class="container">
      <div class="inner">
        <div class="picker">
        <input
          type="color"
          value={colours.colour1}
          id="colour1"
          onChange={e => updateColour1(e)}
        />{" "}
        <input
          type="color"
          value={colours.colour2}
          id="colour2"
          onChange={e => updateColour2(e)}
        />{" "}
        <input
          type="button"
          value="Average"
          onClick={e => average(colours.colour1, colours.colour2, 5)}
        />{" "}
        </div>
        <div class="swatches">
        {colours.swatches.map((swatch, index) => <div key={index}> {swatch} </div>)}
        {/* return <Image key={swatch.id} swatch={swatch} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
