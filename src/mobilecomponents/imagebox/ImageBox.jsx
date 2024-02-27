import React, { useState, useEffect, useCallback } from 'react';
import './ImageBox.css';

const ImageBox = ({ pokemonId }) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  const [pokeSprite, setPokeSprite] = useState("");

  const fetchSprite = useCallback(() => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setPokeSprite(d.sprites.front_default))
      .catch((error) => console.log("Error fetching data:", error));
  }, [url, setPokeSprite]);

  useEffect(() => {
    fetchSprite();
  }, [pokemonId, fetchSprite]);


  return (
    <div className="imagebox-container">
      <div className="dot-container">
        <div className="top-dots"></div>
        <div className="top-dots"></div>
      </div>
      <div className="imagebox-screen">
        <div className="poke-image">
          {pokeSprite && <img src={pokeSprite} alt="Pokemon Sprite" />}
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
