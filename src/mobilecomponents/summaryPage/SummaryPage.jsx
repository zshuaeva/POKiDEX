import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectFlavorText, setFlavorText } from '../../pokemonSlice';
import './SummaryPage.css';

const SummaryPage = () => {
  const dispatch = useDispatch();
  const flavorText = useSelector(selectFlavorText);
  const pokemonId = useSelector((state) => state.pokemon.pokemonId);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFlavorText(data.flavor_text_entries[0].flavor_text));
      })
      .catch((error) => {
        console.error("Error fetching flavor text:", error);
      });
  }, [dispatch, pokemonId]);

  return (
    <div className="summary-container">
      <div>
        <Typography>{flavorText}</Typography>
      </div>
    </div>
  );
}

export default SummaryPage;
