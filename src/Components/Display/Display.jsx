import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./display.css";

function Display({ name }) {
  const [pokemon, setPokemon] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const pokemonName = name ? name : "pikachu";
    const URL = "https://pokeapi.co/api/v2/pokemon/";
    const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/";

    const pokemonData = fetch(`${URL}${pokemonName}`);
    const speciesData = fetch(`${speciesURL}${pokemonName}`);
    Promise.all([pokemonData, speciesData])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((data) => {
        // console.log(`pokemon data: `, data[0]);
        // console.log(`species data: `, data[1]);
        setPokemon(data[0]);
        setDescription(data[1]);
      })
      .catch((err) => {
        console.log("API error ", err);
      });
  }, [name]);

  return (
    <div className="display">
      {pokemon && (
        <>
          <img
            src={pokemon.sprites.front_default}
            width={350}
            height={350}
            alt="pikachu"
          />
          <h2>
            #{pokemon.id} {pokemon.name}
          </h2>
        </>
      )}
      {description && <p>{description.flavor_text_entries[10].flavor_text}</p>}
    </div>
  );
}

Display.propTypes = {
  name: PropTypes.string.isRequired, // Validates 'name' prop as a required string
};

export default Display;
