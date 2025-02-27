import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectFlavorText, setFlavorText, setHeight, setWeight } from '../../pokemonSlice';
import './SummaryPage.css';

const SummaryPage = () => {
  const dispatch = useDispatch();
  const flavorText = useSelector(selectFlavorText);
  const height = useSelector((state) => state.pokemon.height);
  const weight = useSelector((state) => state.pokemon.weight)
  const pokemonId = useSelector((state) => state.pokemon.pokemonId);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((res) => res.json())
      .then((data) => {

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
          .then((res) => res.json())
          .then((speciesData) => {
            const enFlavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
            if (enFlavorTextEntry) {
              dispatch(setFlavorText(enFlavorTextEntry.flavor_text));
            } else {
              console.error("No English summary found for this Pokemon.");
            }
          })
          .catch((error) => {
            console.error("Error fetching flavor text:", error);
          });
        dispatch(setHeight(data.height)); // height is usually in decimeters
        dispatch(setWeight(data.weight)); //weight is in hectograms
      })
      .catch((error) => {
        console.error("Error fetching pokemon data:", error);
      });
  }, [dispatch, pokemonId]);

  // Function to convert decimeters to feet and inches
  const convertToFeetAndInches = (heightInDecimeters) => {
    const heightInMeters = heightInDecimeters / 10;
    const heightInFeet = heightInMeters * 3.28084;
    const feet = Math.floor(heightInFeet);
    const inches = Math.round((heightInFeet - feet) * 12);

    return `${feet}'${inches}"`;
  };

  const convertToPounds = (weightInHectograms) => {
    return Math.round(weightInHectograms * 0.220462); // Convert hectograms to pounds
  };



  return (
    <div className="summary-container">
      <div className="summary-text">
        <p>{flavorText}</p>
        {height && <p><strong>Height:</strong> {convertToFeetAndInches(height)}</p>}
        {weight && <p><strong>Weight:</strong> {convertToPounds(weight)} lbs</p>}
      </div>
    </div>

  );


}

export default SummaryPage;
