import React, { useState } from 'react';
import './SearchBar.css';

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
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input
        type="text"
        placeholder="Pokemon Name or #"
        value={searchInput}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
