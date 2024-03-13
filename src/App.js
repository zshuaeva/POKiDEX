import React, { useState } from "react";
import "./App.css";
import Pokidex from "./mobilecomponents/pokidex/Pokidex";
import SearchBar from "./mobilecomponents/searchbar/SearchBar";
import ImageBox from "./mobilecomponents/imagebox/ImageBox";
import InfoBox from "./mobilecomponents/infobox/InfoBox";
import TabNavigation from "./mobilecomponents/tabNavigation/TabNavigation";
import EvolutionTree from "./mobilecomponents/evolutionTree/EvoltionTree";
import SummaryPage from "./mobilecomponents/summaryPage/SummaryPage";

const App = () => {
  const [pokemonId, setPokemonId] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  const handleSearch = (id) => {
    setPokemonId(id);
  };

  return (
    <div className="App">
      <Pokidex />
      <div className="searchbar-component">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="content-container">
        <div className="imagebox-infobox-container">
          <div className="imagebox-component">
            <ImageBox pokemonId={pokemonId} />
          </div>
          <div className="infobox-component">
            {activeTab === "info" && <InfoBox pokemonId={pokemonId} />}
            {activeTab === "evolution" && <EvolutionTree pokemonId={pokemonId} />}
            {activeTab === "summary" && <SummaryPage pokemonId={pokemonId} />}
            <div className="tab-navigation">
              <TabNavigation setActiveTab={setActiveTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
