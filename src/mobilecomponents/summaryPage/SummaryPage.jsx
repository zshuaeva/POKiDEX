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
        const enFlavorTextEntry = data.flavor_text_entries.find(entry => entry.language.name === "en");
        if (enFlavorTextEntry) {
          dispatch(setFlavorText(enFlavorTextEntry.flavor_text));
        } else {
          console.error("No English summary found for this Pokemon.");
        }
      })
      .catch((error) => {
        console.error("Error fetching flavor text:", error);
      });
  }, [dispatch, pokemonId]);

  return (
    <div className="summary-container">
      <div className="summary-text">
        {flavorText}
      </div>
    </div>
  );
}

export default SummaryPage;
