import React, { useState } from 'react';
import './SearchBar.css';
import { Box, TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = async (event) => {
    const input = event.target.value;
    setSearchInput(input);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      const pokemonId = data.id;
      onSearch(pokemonId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Box sx={{ '& > :not(style)': { m: 1 } }} className='search-box'>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', input: {color: 'white'} }}>
        <TextField
          InputLabelProps={{style : {color : 'white'} }}
          id="input-with-sx"
          label="Pokemon Name or #"
          variant="outlined"
          value={searchInput}
          color="secondary"
          onChange={handleInputChange}
          className="search-box"
        />
        <Button type="submit" onClick={handleSubmit} variant="primary" size="small" className='search-button'>
          Search
        </Button>
      </Box>
    </Box>
</>

  );
};


export default SearchBar;
