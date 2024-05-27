import { useState, useEffect } from "react";
import Banner from "./Components/Banner/Banner";
import Display from "./Components/Display/Display";
import "./App.css";

function App() {
  const [name, setName] = useState("pikachu");
  const [searchName, setSearchName] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [lightMode, setLightMode] = useState(false);

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setName(searchName);
  };

  const handleClick = (e) => {
    setName(e.target.innerText);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      // console.log("enter key pressed!", e.target.innerText);
      handleClick(e);
    }
  };

  const handleClickLightMode = () => {
    console.log("light model", !lightMode);
    setLightMode(!lightMode);
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      });
  }, []);

  return (
    <>
      <Banner mode={lightMode} handleClickLight={handleClickLightMode} />
      <main className={lightMode ? "light" : ""}>
        <form
          className={lightMode ? "searchForm light" : "searchForm"}
          onSubmit={handleSubmit}
        >
          <input
            className={lightMode ? "searchInput light" : "searchInput"}
            type="search"
            placeholder="Search Pokedex"
            onChange={handleChange}
            value={searchName}
            tabIndex="1"
            name="Search input field"
          />
          <button type="submit" tabIndex="2">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <div className={lightMode ? "wrapper light" : "wrapper"}>
          <Display name={name} mode={lightMode} />
          <ul className={lightMode ? "list light" : "list"}>
            {pokemonList.map((pokemon, index) => (
              <li
                key={index}
                onClick={handleClick}
                onKeyDown={handleEnter}
                tabIndex={index + 10}
                className={lightMode ? "light" : ""}
                style={{
                  borderBottom: "solid grey 2px",
                }}
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
