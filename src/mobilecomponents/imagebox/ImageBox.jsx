import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import './ImageBox.css';

const ImageBox = ({ pokemonId }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
  }));

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  const [pokeSprite, setPokeSprite] = useState("");
  const [isShiny, setIsShiny] = useState(false);

  const fetchSprite = useCallback(() => {
    const spriteType = isShiny ? 'front_shiny' : 'front_default';
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setPokeSprite(d.sprites[spriteType]))
      .catch((error) => console.log("Error fetching data:", error));
  }, [url, setPokeSprite, isShiny]);

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
      <div className='shiny-toggle'>
        <Stack spacing={2} direction="row">
          <ColorButton variant="contained" onClick={() => setIsShiny(!isShiny)}>
            {isShiny ? 'View Regular' : 'View Shiny'}
          </ColorButton>
        </Stack>
      </div>
    </div>
  );
};

export default ImageBox;
