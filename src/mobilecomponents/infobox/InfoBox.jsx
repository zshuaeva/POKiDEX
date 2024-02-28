import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import './InfoBox.css';

const InfoBox = ({ pokemonId }) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  const [pokeTypes, setPokeTypes] = useState([]);

  const fetchPokemonData = useCallback(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const types = data.types.map((typeData) => typeData.type.name);
        setPokeTypes(types);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [url]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  return (
    <div className="info-box">
      <Box className="info-container">
        <Typography variant="h5" component="h2" className="type-header">
          Type
        </Typography>

        <List>
        {pokeTypes.map((type, index) => (
          <List key={index}>{type}</List>
        ))}
      </List>
      </Box>

    </div>
  );
};

export default InfoBox;
