import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPokemonId } from "../../pokemonSlice";
import "./SearchBar.css";
import { Box, TextField, Button } from "@mui/material";
import RandomIcon from './random.png';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await response.json();
      const pokemonId = data.id;
      dispatch(setPokemonId(pokemonId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRandomize = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    dispatch(setPokemonId(randomId));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className="search-box">
        <TextField
          id="input-with-sx"
          label="PkMn Name or #"
          variant="outlined"
          value={searchInput}
          onChange={handleInputChange}
          inputProps={{ style: { color: "white" } }}
          className="search-box"
        />
        <Box className="button-box">
        <Button
          type="submit"
          variant="text"
          size="small"
          className="search-button"
          style={{ color: "white" }}
        >
          Search
        </Button>
        <div className="randomize-button-container">
          <Button
            size="small"
            variant="text"
            className="randomize-button"
            style={{ color: "white" }}
            onClick={handleRandomize}
          >
            <img src={RandomIcon} alt="Random Icon" className="random-icon" />
          </Button>
        </div>
        </Box>
      </Box>
    </form>
  );
};

export default SearchBar;
