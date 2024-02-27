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
    <div className="App">
      <Pokidex />
      <div className="searchbar-component">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="imagebox-component">
      <ImageBox pokemonId={pokemonId} />
      </div>
    </div>
  );
}

export default App;
