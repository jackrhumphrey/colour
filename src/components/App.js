import * as React from "react";

import "./App.css";

import Swatch from "./Swatch";

import { Input } from "semantic-ui-react";

function App() {
  const [colours, setColours] = React.useState({
    colour1: "#" + Math.floor(Math.random() * 16777215).toString(16),
    colour2: "#" + Math.floor(Math.random() * 16777215).toString(16),
    swatches: []
  });
  const [midpoints, setMidpoints] = React.useState(1);

  const average = React.useCallback(
    (c1, c2, midpoints) => {
      console.log(midpoints);

      var c1red = parseInt(c1.substr(1, 2), 16);
      var c2red = parseInt(c2.substr(1, 2), 16);
      var c1green = parseInt(c1.substr(3, 2), 16);
      var c2green = parseInt(c2.substr(3, 2), 16);
      var c1blue = parseInt(c1.substr(5, 2), 16);
      var c2blue = parseInt(c2.substr(5, 2), 16);
      var swatches = [];
      var n = parseInt(midpoints);

      for (var i = 0; i < n + 2; i++) {
        var red = ((c2red * i + c1red * (n + 1 - i)) / (n + 1));
        var redhex = Math.round(red).toString(16);
        if (redhex.length === 1) {
          redhex = "0" + redhex;
        }

        var green = ((c2green * i + c1green * (n + 1 - i)) / (n + 1));
        var greenhex = Math.round(green).toString(16);
        if (greenhex.length === 1) {
          greenhex = "0" + greenhex;
        }

        var blue = ((c2blue * i + c1blue * (n + 1 - i)) / (n + 1));
        var bluehex = Math.round(blue).toString(16);
        if (bluehex.length === 1) {
          bluehex = "0" + bluehex;
        }

        var hex = "#" + redhex + greenhex + bluehex;

        console.log("hex " + hex);

        swatches = [...swatches, hex]

      }
      setColours({
        colour1: c1,
        colour2: c2,
        swatches: [...swatches]
      });
      setMidpoints(midpoints);

    }, []
  );

  // const updateColour1 = React.useCallback(
  //   e => {
  //     console.log(e.target.value);
  //     setColours({
  //       ...colours,
  //       colour1: e.target.value,
  //     });
  //     average(e.target.value, colours.colour2, 1);
  //   },
  //   [colours, average]
  // );

  // const updateColour2 = React.useCallback(
  //   e => {
  //     console.log(e.target.value);
  //     setColours({
  //       ...colours,
  //       colour2: e.target.value
  //     });
  //     // average(colours.colour1, e.target.value, 1);
  //   },
  //   [colours, average]
  // );

  return (
    <div className="container">
      <div className="inner">
        <div className="picker">
          <Input
            label="Colour 1"
            type="color"
            value={colours.colour1}
            id="colour1"
            onChange={e => average(e.target.value, colours.colour2, midpoints)}
          />
          <Input
            label="Colour 2"
            type="color"
            value={colours.colour2}
            id="colour2"
            onChange={e => average(colours.colour1, e.target.value, midpoints)}
          />
          <Input
            label="Midpoints"
            type="number"
            min="1"
            value={midpoints}
            onChange={(e) => {
              average(colours.colour1, colours.colour2, e.target.value)
            }}
          />
        </div>
        <div className="swatches">
          {colours.swatches.map((swatch, index) => <Swatch key={index} colour={swatch} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
