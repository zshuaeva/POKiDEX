import React, { useState, useEffect, useCallback } from "react";
import "./EvolutionTree.css";
import { Typography, Box } from "@mui/material";

const EvolutionTree = ({ pokemonId }) => {
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [evolutionData, setEvolutionData] = useState(null);

    const fetchPokemonData = useCallback(() => {
        if (!pokemonId) return;
        const fetchUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
        fetch(fetchUrl)
            .then((res) => res.json())
            .then((data) => {
                setEvolutionChain(data.evolution_chain.url);
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, [pokemonId]);

    const fetchEvolutionChain = useCallback(() => {
        if (!evolutionChain) return;
        fetch(evolutionChain)
            .then((res) => res.json())
            .then((data) => {
                setEvolutionData(data);
            })
            .catch((error) => console.log("Error fetching evolution chain:", error));
    }, [evolutionChain]);

    useEffect(() => {
        fetchPokemonData();
    }, [fetchPokemonData]);

    useEffect(() => {
        fetchEvolutionChain();
    }, [fetchEvolutionChain]);

    const renderEvolutionChain = () => {
        if (!evolutionData) return null;

        const chain = evolutionData.chain;
        const evolutionList = [];

        const traverseChain = (chain) => {
            if (chain.species) {
                evolutionList.push(chain.species.name);
            }
            if (chain.evolves_to && chain.evolves_to.length > 0) {
                chain.evolves_to.forEach((evolution) => {
                    traverseChain(evolution);
                });
            }
        };

        traverseChain(chain);

        return (
            <div>
                {evolutionList.map((pokemon, index) => (
                    <div key={index}>{pokemon}</div>
                ))}
            </div>
        );
    };

    return (
        <div className="evolution-tree">
            <Box className="evolution-container">
                <Typography>Evolution Chain:</Typography>
                <div className="evo-sprites">
                    {renderEvolutionChain()}
                </div>
            </Box>
        </div>
    );
};

export default EvolutionTree;






// https://pokeapi.co/api/v2/pokemon-species/1/
//contains key value pair for evlution chain link, by id.

// "evolution_chain": {
//   "url": "https://pokeapi.co/api/v2/evolution-chain/1/"
// },


// https://pokeapi.co/api/v2/evolution-chain/2/
// ID number is related to next species not globaldex
// data.chain.evolves_to.name
