import React, { useState, useEffect, useCallback } from "react";
import "./EvolutionTree.css";
import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPokemonId } from "../../pokemonSlice";

const EvolutionTree = () => {
    const [evolutionData, setEvolutionData] = useState(null);
    const dispatch = useDispatch();

    const pokemonId = useSelector((state) => state.pokemon.pokemonId);

    const fetchEvolutionData = useCallback((pokemonId) => {
        if (!pokemonId) return;
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then((res) => res.json())
            .then((data) => {
                fetch(data.species.url)
                    .then((res) => res.json())
                    .then((speciesData) => {
                        fetch(speciesData.evolution_chain.url)
                            .then((res) => res.json())
                            .then((evolutionData) => setEvolutionData(evolutionData))
                            .catch((error) => console.log("Error fetching evolution data:", error));
                    })
                    .catch((error) => console.log("Error fetching species data:", error));
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, []);

    const handleClickPokemon = (id) => {
        dispatch(setPokemonId(id));
    };

    const renderEvolutionChain = () => {
        if (!evolutionData) return null;

        const chain = evolutionData.chain;
        const evolutionList = [];

        const capitalizeFirstLetter = (name) => {
            return name.charAt(0).toUpperCase() + name.slice(1);
        };

        const traverseChain = (chain) => {
            if (chain.species) {
                evolutionList.push(
                    <div key={chain.species.name} onClick={() => handleClickPokemon(chain.species.name)}>
                        {capitalizeFirstLetter(chain.species.name)}
                    </div>
                );
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
                {evolutionList}
            </div>
        );
    };

    useEffect(() => {
        fetchEvolutionData(pokemonId);
    }, [pokemonId, fetchEvolutionData]);

    return (
        <div className="evolution-tree">
            <Box className="evolution-container">
                <Typography className="family-header">Pokemon Family:</Typography>
                <div className="evo-sprites">
                    {renderEvolutionChain()}
                </div>
            </Box>
        </div>
    );
};

export default EvolutionTree;
