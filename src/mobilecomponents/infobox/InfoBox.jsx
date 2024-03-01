import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import List from "@mui/material/List";
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
        <Typography>
          {capitalizeEachWord(pokeName)} #{globalID}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          className="type-header"
          align="left"
        >
          Type:
          <List>
            {pokeTypes.map((type, index) => (
              <List key={index}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </List>
            ))}
          </List>
        </Typography>

        {typeRelations && (
          <div>
            <Typography variant="h5" component="h3" className="type-header">
              Weaknesses
            </Typography>
            <div>
              <strong>2x damage from:</strong>{" "}
              {typeRelations.double_damage_from
                ? typeRelations.double_damage_from
                    .map((type) => capitalizeEachWord(type.name))
                    .join(", ")
                : ""}
            </div>
            <Typography variant="h5" component="h3" className="type-header">
              Strengths
            </Typography>
            <div>
              <strong>2x damage to:</strong>{" "}
              {typeRelations.double_damage_to
                ? typeRelations.double_damage_to
                    .map((type) => capitalizeEachWord(type.name))
                    .join(", ")
                : ""}
            </div>
            <Typography variant="h5" component="h3" className="type-header">
              Effects
            </Typography>
            <div>
              <strong>No damage to:</strong>{" "}
              {typeRelations.no_damage_to
                ? typeRelations.no_damage_to
                    .map((type) => capitalizeEachWord(type.name))
                    .join(", ")
                : ""}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
};

export default InfoBox;
