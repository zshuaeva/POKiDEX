import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import ShinyStars from './shinyindicator.png';
import './ImageBox.css';

const ImageBox = () => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));

  const [pokeSprite, setPokeSprite] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  // const dispatch = useDispatch();
  const pokemonId = useSelector((state) => state.pokemon.pokemonId);

  const fetchSprite = useCallback(() => {
    if (pokemonId) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
      const spriteType = isShiny ? "front_shiny" : "front_default";
      fetch(url)
        .then((res) => res.json())
        .then((data) => setPokeSprite(data.sprites[spriteType]))
        .catch((error) => console.log("Error fetching data:", error));
    }
  }, [pokemonId, isShiny]);

  useEffect(() => {
    fetchSprite();
  }, [pokemonId, isShiny, fetchSprite]);

  return (
    <div className="imagebox-container">
      <div className="dot-container">
        <div className="top-dots"></div>
        <div className="top-dots"></div>
      </div>
      <div className="imagebox-screen">
        <div className="poke-image">
          {pokeSprite && (
            <div className="sprite-container">
              <img src={pokeSprite} alt="Pokemon Sprite" />
            </div>
          )}
          {isShiny && (
            <div className="shiny-stars-container">
              <img
                className="shiny-stars"
                src={ShinyStars}
                alt="Shiny Indicator"
              />
            </div>
          )}
        </div>
      </div>
      <div className="shiny-toggle">
        <Stack spacing={2} direction="row">
          <ColorButton variant="contained" onClick={() => setIsShiny(!isShiny)}>
            {isShiny ? "View Regular" : "View Shiny"}
          </ColorButton>
        </Stack>
      </div>
    </div>
  );
};

export default ImageBox;
