import { useState, useEffect } from "react";
import Banner from "./Components/Banner/Banner";
import Display from "./Components/Display/Display";
import "./App.css";

function App() {
  const [name, setName] = useState("pikachu");
  const [pokemonList, setPokemonList] = useState([]);

  const handleClick = (e) => {
    //do stuff
    // console.log("clicked!", e.target.innerText);
    setName(e.target.innerText);
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.results);
        setPokemonList(data.results);
      });
  }, []);

  return (
    <>
      <Banner />
      <main>
        <Display Pokemon={name} />
        <ul className="list">
          {pokemonList.map((pokemon, index) => (
            <li key={index} onClick={handleClick}>
              {pokemon.name}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
