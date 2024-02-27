import React, { useState } from 'react';
import './App.css';
import Pokidex from './mobilecomponents/pokidex/Pokidex';
import SearchBar from './mobilecomponents/searchbar/SearchBar';
import ImageBox from './mobilecomponents/imagebox/ImageBox';


const App = () => {
  const [pokemonId, setPokemonId] = useState(null);

  const handleSearch = (id) => {
    setPokemonId(id);
  };


  return (
    <div>
      <Pokidex />
      <SearchBar onSearch={handleSearch} />
      <ImageBox pokemonId={pokemonId} />
    </div>
  );
}

export default App;
