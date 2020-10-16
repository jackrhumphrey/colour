import * as React from "react";

import "./App.css";

import Swatch from "./Swatch";

import { Input } from "semantic-ui-react";

function App() {
  const pad = React.useCallback(number => {
    while (number.length < 6) {
      number = "0" + number;
    }
    return number;
  }, []);

  const [colours, setColours] = React.useState({
    colour1: "#" + pad(Math.floor(Math.random() * 16777215).toString(16)),
    colour2: "#" + pad(Math.floor(Math.random() * 16777215).toString(16))
  });
  const [textInput, setTextInput] = React.useState({
    colour1: colours.colour1,
    colour2: colours.colour2
  });
  const [midpoints, setMidpoints] = React.useState(3);

  const swatches = React.useCallback((c1, c2, midpoints) => {
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

      swatchesList = [...swatchesList, hex];
    }

    return (
      <>
        {swatchesList.map((swatch, index) => (
          <Swatch key={index} colour={swatch} />
        ))}
      </>
    );
  }, []);

  const textInputHandler = React.useCallback(
    (key, c) => {
      if ((c.length > 0 && c.slice(0, 1) !== "#") || c.length < 1) {
        c = "#" + c;
      }
      if (c.length > 7) {
        c = c.slice(0, 7);
      }
      setTextInput({ ...textInput, [key]: c });
      const s = new Option().style;
      s.color = c;
      if (s.color !== "" && c.length === 7) {
        setColours({ ...colours, [key]: c });
      } else if (s.color !== "" && c.length === 4) {
        c =
          c.slice(0, 2) +
          c.slice(1, 2) +
          c.slice(2, 3) +
          c.slice(2, 3) +
          c.slice(3, 4) +
          c.slice(3, 4);
        setColours({ ...colours, [key]: c });
      }
    },
    [colours, textInput]
  );

  const updateColour = React.useCallback(
    (key, c) => {
      setColours({
        ...colours,
        [key]: c
      });
      setTextInput({
        ...textInput,
        [key]: c
      });
    },
    [colours, textInput]
  );

  return (
    <div className="container">
      <div className="margin">
        <div className="inner">
          <div className="picker">
            <div className="pickerGrid">
              <label className="label" htmlFor="colour1">
                Colour 1
              </label>
              <input
                type="color"
                id="colour1"
                name="colour1"
                value={colours.colour1}
                onChange={e => updateColour("colour1", e.target.value)}
              />
              <Input
                value={textInput.colour1}
                maxLength="7"
                style={{ width: "6.5em" }}
                onChange={e => {
                  textInputHandler("colour1", e.target.value);
                }}
              />
              <label className="label" htmlFor="colour2">
                Colour 2
              </label>
              <input
                type="color"
                id="colour2"
                name="colour2"
                value={colours.colour2}
                onChange={e => updateColour("colour2", e.target.value)}
              />
              <Input
                value={textInput.colour2}
                maxLength="7"
                style={{ width: "6.5em" }}
                onChange={e => textInputHandler("colour2", e.target.value)}
              />
              <label className="label" htmlFor="midpoints">
                Midpoints
              </label>
              <div style={{ gridColumn: "2 / 4" }}>
                <Input
                  type="number"
                  id="midpoints"
                  name="midpoints"
                  min="1"
                  max="254"
                  value={midpoints}
                  onChange={e => {
                    if (e.target.value > 254) {
                      e.target.value = 254;
                    }
                    if (e.target.value < 1) {
                      e.target.value = 1;
                    }
                    setMidpoints(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="swatches">
            {swatches(colours.colour1, colours.colour2, midpoints)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
