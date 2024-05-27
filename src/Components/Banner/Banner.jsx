/* eslint-disable react/prop-types */
import "./banner.css";

function Banner({ mode, handleClickLight }) {
  const ash = "Ash's";

  return (
    <div className="banner">
      <div className="blueCircle"></div>
      <div className="whiteCircle"></div>
      <div className="red"></div>
      <div className="yellow"></div>
      <div className="green"></div>
      <h1>{ash} Pokedex</h1>
      <i
        className={mode ? "hideIcon" : "fas fa-sun lightIcon"}
        mode={mode}
        onClick={handleClickLight}
      ></i>
      <i
        className={mode ? "fas fa-moon lightIcon" : "hideIcon"}
        mode={mode}
        onClick={handleClickLight}
      ></i>
    </div>
  );
}

export default Banner;
