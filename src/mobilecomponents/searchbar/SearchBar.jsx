import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPokemonId } from "../../pokemonSlice";
import "./SearchBar.css";
import { Box, TextField, Button } from "@mui/material";

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

  return (
    <form onSubmit={handleSubmit}>
      <Box className="search-box">
        <TextField
          id="input-with-sx"
          label="Pokemon Name or #"
          variant="outlined"
          value={searchInput}
          onChange={handleInputChange}
          inputProps={{ style: { color: "white" } }}
          className="search-input"
        />
        <Button
          type="submit"
          variant="primary"
          size="small"
          className="search-button"
          style={{ color: "white" }}
        >
          Search
        </Button>
      </Box>
    </form>
  );
};

export default SearchBar;
