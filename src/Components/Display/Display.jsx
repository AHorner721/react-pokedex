import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import "./display.css";

function Display({ name }) {
  // console.log("am i getting a name? ", name);
  const [pokemon, setPokemon] = useState();
  const [description, setDescription] = useState();

  const handleLoad = () => {
    if (pokemon) {
      gsap.fromTo(
        ".image",
        { y: "100", opacity: 0, duration: 1.5, ease: "power2" },
        { y: 0, opacity: 1, duration: 1.5, ease: "bounce" }
      );
      gsap.fromTo(
        ".displayText",
        { y: "100", opacity: 0, duration: 1, ease: "power2" },
        { y: 0, opacity: 1, duration: 1, ease: "power2" }
      );
    }
  };

  useEffect(() => {
    const pokemonName = name ? name.trim().toLowerCase() : "pikachu";
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
          <div className="imageWrapper">
            <img
              className="image"
              src={pokemon.sprites.other["official-artwork"].front_default}
              width={350}
              height={350}
              alt={"Picture of " + pokemon.name}
              tabIndex="3"
              onLoad={handleLoad}
            />
          </div>
          <div className="pokemonName">
            <h2 className="displayText" tabIndex="4">
              #{pokemon.id} {pokemon.name}
            </h2>
          </div>
        </>
      )}
      <div className="pokemonMetaData">
        {description && (
          <>
            <span className="displayText" tabIndex="5">
              Type: {pokemon.types[0].type.name}
            </span>
            <span className="displayText" tabIndex="6">
              Habitat: {description.habitat.name}
            </span>
            <span className="displayText" tabIndex="7">
              Height: {pokemon.height / 10} m
            </span>
            <span className="displayText" tabIndex="8">
              Weight: {pokemon.weight / 10} kg
            </span>
          </>
        )}
      </div>
      <div className="pokemonDescription">
        {description && (
          <p className="displayText" tabIndex="9">
            {description.flavor_text_entries[10].flavor_text}
          </p>
        )}
      </div>
    </div>
  );
}

Display.propTypes = {
  name: PropTypes.string.isRequired, // Validates 'name' prop as a required string
};

export default Display;
