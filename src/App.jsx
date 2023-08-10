import { useState, useEffect } from "react";
import Banner from "./Components/Banner/Banner";
import Display from "./Components/Display/Display";
import "./App.css";

function App() {
  const [name, setName] = useState("pikachu");
  const [searchName, setSearchName] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

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
      console.log("enter key pressed!", e.target.innerText);
      handleClick(e);
    }
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
      <Banner />
      <main>
        <form className="searchContainer" onSubmit={handleSubmit}>
          <input
            className="searchBox"
            type="text"
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
        <div className="wrapper">
          <Display name={name} />
          <ul className="list">
            {pokemonList.map((pokemon, index) => (
              <li
                key={index}
                onClick={handleClick}
                onKeyDown={handleEnter}
                tabIndex={index + 10}
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
