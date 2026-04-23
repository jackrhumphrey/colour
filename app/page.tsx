import Display from "./display";

export default function Page() {
  const toHex = (number: number) => {
    let hex = number.toString(16);
    while (hex.length < 6) {
      hex = "0" + hex;
    }
    return "#" + hex;
  };

  const initColours = [
    toHex(Math.floor(Math.random() * 16777215)),
    toHex(Math.floor(Math.random() * 16777215)),
  ];

  return <Display initColours={initColours} />;
}
