import React, { useState, useEffect, useCallback } from "react";
import "./EvolutionTree.css";
import { Typography, Box } from "@mui/material";

const EvolutionTree = ({ pokemonId }) => {
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [pokeSprites, setPokeSprites] = useState({});
    const [numSpritesFetched, setNumSpritesFetched] = useState(0);

    console.log(pokemonId, "ID PROP IS WORKING");

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

    useEffect(() => {
        fetchPokemonData();
    }, [fetchPokemonData]);

    useEffect(() => {
        if (!evolutionChain) return;

        fetch(evolutionChain)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setEvolutionChain(data.chain);
                fetchSprites(data.chain);
            })
            .catch((error) => console.log("Error fetching evolution chain:", error));
    }, [evolutionChain]);

    const fetchSprites = (chain) => {
        if (!chain || !chain.species) return;

        const fetchSprite = (pokemonId) => {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setPokeSprites((prevSprites) => ({
                        ...prevSprites,
                        [pokemonId]: data.sprites.front_default
                    }));
                    setNumSpritesFetched((prevNumSprites) => prevNumSprites + 1);
                })
                .catch((error) => console.log("Error fetching sprite:", error));
        };

        fetchSprite(getPokemonIdFromUrl(chain.species.url));

        chain.evolves_to.forEach((evolution) => {
            fetchSprite(getPokemonIdFromUrl(evolution.species.url));
        });
    };

    const getPokemonIdFromUrl = (url) => {
        const parts = url.split("/");
        return parts[parts.length - 2];
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderChain = (chain) => {
        if (!chain || !chain.species) return null;

        if (numSpritesFetched !== Object.keys(pokeSprites).length) {
            // Not all sprites are fetched yet
            return null;
        }

        return (
            <div className="evo-render" key={chain.species.name}>
                {pokeSprites[getPokemonIdFromUrl(chain.species.url)] && (
                    <img src={pokeSprites[getPokemonIdFromUrl(chain.species.url)]} alt={chain.species.name} />
                )}
                {/* <p>{capitalizeFirstLetter(chain.species.name)}</p> */}
                {chain.evolves_to.length > 0 && (
                    <div className="nested">
                        {chain.evolves_to.map((evolution) => renderChain(evolution))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="evolution-tree">
          <Box className="evolution-container">
            <h5>Evolution Chain:</h5>
            <div className="evo-sprites"></div>
            {renderChain(evolutionChain)}
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
