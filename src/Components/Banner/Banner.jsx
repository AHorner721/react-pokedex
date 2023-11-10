import "./banner.css";

function Banner() {
  const ash = "Ash's";
  return (
    <div className="banner">
      <div className="blueCircle"></div>
      <div className="whiteCircle"></div>
      <div className="red"></div>
      <div className="yellow"></div>
      <div className="green"></div>
      <h1>{ash} Pokedex</h1>
    </div>
  );
}

export default Banner;
