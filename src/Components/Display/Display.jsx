import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import "./display.css";

// eslint-disable-next-line react/prop-types
function Display({ name, mode }) {
  // console.log("am i getting a name? ", name);
  const [pokemon, setPokemon] = useState();
  const [description, setDescription] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoadImage = () => {
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
      setImageLoaded(true);
    }
  };

  useEffect(() => {
    setImageLoaded(false);
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
          <div className={mode ? "imageWrapper blueBg" : "imageWrapper"}>
            <img
              className="image"
              src={pokemon.sprites.other["official-artwork"].front_default}
              width={350}
              height={350}
              alt={"Picture of " + pokemon.name}
              tabIndex="3"
              onLoad={handleLoadImage}
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            />
          </div>
          <div
            className={mode ? "pokemonName light" : "pokemonName"}
            style={{
              borderBottom: "solid grey 2px",
            }}
          >
            <h2
              className={mode ? "displayText light" : "displayText"}
              tabIndex="4"
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            >
              #{pokemon.id} {pokemon.name}
            </h2>
          </div>
        </>
      )}
      <div className="pokemonMetaData">
        {pokemon && (
          <>
            <span
              className={mode ? "displayText light" : "displayText"}
              tabIndex="5"
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            >
              Type: {pokemon.types[0].type.name}
            </span>
            <span
              className={mode ? "displayText light" : "displayText"}
              tabIndex="6"
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            >
              Habitat: {description.habitat.name}
            </span>
            <span
              className={mode ? "displayText light" : "displayText"}
              tabIndex="7"
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            >
              Height: {pokemon.height / 10} m
            </span>
            <span
              className={mode ? "displayText light" : "displayText"}
              tabIndex="8"
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            >
              Weight: {pokemon.weight / 10} kg
            </span>
          </>
        )}
      </div>
      <div className="pokemonDescription">
        {pokemon && (
          <p
            className={mode ? "displayText light" : "displayText"}
            tabIndex="9"
            style={{ visibility: imageLoaded ? "visible" : "hidden" }}
          >
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
