import React, { useState, useEffect } from 'react';
import './ImageBox.css'


const ImageBox = () => {
  const url = "https://pokeapi.co/api/v2/pokemon/493/"
  // template literal `https://pokeapi.co/api/v2/pokemon-form/${id or name}/`
  const [pokeSprite, setPokeSprite] = useState("")

  const fetchSprite = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setPokeSprite(d.sprites.front_default))
      .catch((error) => console.log("Error fetching data:", error));
  }

  useEffect(() => {
    fetchSprite();
  }, []);

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

  )// end of return
}// end of function

export default ImageBox;
