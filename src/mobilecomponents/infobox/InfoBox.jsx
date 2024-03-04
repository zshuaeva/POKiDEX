import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import "./InfoBox.css";

const InfoBox = ({ pokemonId }) => {
  const [pokeTypes, setPokeTypes] = useState([]);
  const [typeRelations, setTypeRelations] = useState(null);
  const [globalID, setGlobalID] = useState("");
  const [pokeName, setPokeName] = useState("");

  const fetchPokemonData = useCallback(() => {
    if (!pokemonId) return;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    fetch(pokemonUrl)
      .then((res) => res.json())
      .then((data) => {
        const types = data.types.map((typeData) => ({
          name: typeData.type.name,
          url: typeData.type.url,
        }));
        setPokeTypes(types);
        setGlobalID(data.id);
        setPokeName(data.name);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [pokemonId]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const fetchTypeRelations = useCallback((typeUrl) => {
    fetch(typeUrl)
      .then((res) => res.json())
      .then((data) => {
        setTypeRelations(data.damage_relations);
      })
      .catch((error) => console.log("Error fetching type relations:", error));
  }, []);

  useEffect(() => {
    if (!pokeTypes.length) return;
    pokeTypes.forEach((type) => {
      fetchTypeRelations(type.url);
    });
  }, [pokeTypes, fetchTypeRelations]);

  function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="info-box">
      <Box className="info-container">
        {globalID && (
          <Typography className="pokemon-name" variant="h5">
            {capitalizeEachWord(pokeName)} {"#" + globalID}
          </Typography>
        )}
        {globalID && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography className="type-header" align="left">
              Type:
            </Typography>

            {pokeTypes.map((type, index) => (
              <React.Fragment key={index}>
                <Typography className="types-info">
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </Typography>
                {index < pokeTypes.length - 1 && <span>, </span>}
              </React.Fragment>
            ))}
          </div>
        )}
        <Box className="spacing"></Box>
        <Box className="spacing"></Box>
        {typeRelations && (
          <Box>
            <Typography variant="h5" component="h5" className="weakness-header">
              <strong>Weaknesses:</strong>
            </Typography>
            <Box className="info-info">
              2x damage from:{" "}
              {typeRelations.double_damage_from
                ? typeRelations.double_damage_from
                    .map((type) => capitalizeEachWord(type.name))
                    .join(", ")
                : ""}
            </Box>
            <Box className="spacing"></Box>
            <Box className="spacing"></Box>
            <Typography variant="h5" component="h5" className="strength-header">
              <strong>Strengths:</strong>
            </Typography>
            <Box className="info-info">
              2x damage to:{" "}
              {typeRelations.double_damage_to
                ? typeRelations.double_damage_to
                    .map((type) => capitalizeEachWord(type.name))
                    .join(", ")
                : ""}
            </Box>
            <Box className="spacing"></Box>
            <Box className="spacing"></Box>
            <Typography variant="h5" component="h5" className="effects-header">
              <strong>Effects:</strong>
            </Typography>
            <Box className="info-info">
              No damage to:{" "}
              {typeRelations.no_damage_to
                ? typeRelations.no_damage_to
                    .map((type) => capitalizeEachWord(type.name))
                    .join(", ")
                : ""}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default InfoBox;
