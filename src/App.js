import React, { useState } from "react";
import "./App.css";
import Pokidex from "./mobilecomponents/pokidex/Pokidex";
import SearchBar from "./mobilecomponents/searchbar/SearchBar";
import ImageBox from "./mobilecomponents/imagebox/ImageBox";
import InfoBox from "./mobilecomponents/infobox/InfoBox";
import EvolutionTree from "./mobilecomponents/evolutionTree/EvoltionTree";

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
      <div className="infobox-component">
        <InfoBox pokemonId={pokemonId} />
      </div>
      <div className="evolution-component">
        <EvolutionTree pokemonId={pokemonId} />
      </div>
    </div>
  );
};

export default App;
