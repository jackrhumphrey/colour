import * as React from "react";

import "./App.css";

import Swatch from "./Swatch";

import { Input } from "semantic-ui-react";

function App() {
  const [colours, setColours] = React.useState({
    colour1: "#" + Math.floor(Math.random() * 16777215).toString(16),
    colour2: "#" + Math.floor(Math.random() * 16777215).toString(16)
  });
  const [midpoints, setMidpoints] = React.useState(1);

  const swatches = (c1, c2, midpoints) => {
    var c1red = parseInt(c1.substr(1, 2), 16);
    var c2red = parseInt(c2.substr(1, 2), 16);
    var c1green = parseInt(c1.substr(3, 2), 16);
    var c2green = parseInt(c2.substr(3, 2), 16);
    var c1blue = parseInt(c1.substr(5, 2), 16);
    var c2blue = parseInt(c2.substr(5, 2), 16);
    var n = parseInt(midpoints);
    var swatchesList = [];

    for (var i = 0; i < n + 2; i++) {
      var red = (c2red * i + c1red * (n + 1 - i)) / (n + 1);
      var redhex = Math.round(red).toString(16);
      if (redhex.length === 1) {
        redhex = "0" + redhex;
      }

      var green = (c2green * i + c1green * (n + 1 - i)) / (n + 1);
      var greenhex = Math.round(green).toString(16);
      if (greenhex.length === 1) {
        greenhex = "0" + greenhex;
      }

      var blue = (c2blue * i + c1blue * (n + 1 - i)) / (n + 1);
      var bluehex = Math.round(blue).toString(16);
      if (bluehex.length === 1) {
        bluehex = "0" + bluehex;
      }

      var hex = "#" + redhex + greenhex + bluehex;

      console.log("hex " + hex);

      swatchesList = [...swatchesList, hex];
    }

    return (
      <>
        {swatchesList.map((swatch, index) => (
          <Swatch key={index} colour={swatch} />
        ))}
      </>
    );
  };

  const updateValues = React.useCallback((c1, c2, midpoints) => {
    setColours({
      colour1: c1,
      colour2: c2
    });
    setMidpoints(midpoints);
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <div className="picker">
          <Input
            label="Colour 1"
            type="color"
            value={colours.colour1}
            id="colour1"
            onChange={e =>
              updateValues(e.target.value, colours.colour2, midpoints)
            }
          />
          <Input
            label="Colour 2"
            type="color"
            value={colours.colour2}
            id="colour2"
            onChange={e =>
              updateValues(colours.colour1, e.target.value, midpoints)
            }
          />
          <Input
            label="Midpoints"
            type="number"
            min="1"
            value={midpoints}
            onChange={e => {
              updateValues(colours.colour1, colours.colour2, e.target.value);
            }}
          />
        </div>
        <div className="swatches">
          {swatches(colours.colour1, colours.colour2, midpoints)}
        </div>
      </div>
    </div>
  );
}

export default App;
