import "./banner.css";
import Search from "../Search/Search";

function Banner() {
  return (
    <div className="banner">
      <div className="circle"></div>
      <h1>Pokedex</h1>
      <Search />
    </div>
  );
}

export default Banner;
