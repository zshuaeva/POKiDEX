import React, { useState, useEffect, useCallback } from "react";
import "./EvolutionTree.css";

const EvolutionTree = ({ pokemonId }) => {
    const [evolutionUrl, setEvolutionUrl] = useState("")

    console.log(pokemonId, "ID PROP IS WORKING")

    const fetchPokemonData = useCallback (() => {
      if (!pokemonId) return;
      const fetchUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.evolution_chain.url)
          setEvolutionUrl(data.evolution_chain.url)
      })
      .catch((error) => console.log("Error fetching data:", error));
    }, [pokemonId]);

    useEffect(() => {
      fetchPokemonData();
    }, [fetchPokemonData]);

  return (
    <>
    Evolution Chain Url: {evolutionUrl}
    </>
  )
}

export default EvolutionTree;



// https://pokeapi.co/api/v2/pokemon-species/1/
//contains key value pair for evlution chain link, by id.

// "evolution_chain": {
//   "url": "https://pokeapi.co/api/v2/evolution-chain/1/"
// },


// https://pokeapi.co/api/v2/evolution-chain/2/
// ID number is related to next species not globaldex
// data.chain.evolves_to.name
