import React, { useState } from "react";
import "./SearchBar.css";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`,
      );
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await response.json();
      const pokemonId = data.id;
      onSearch(pokemonId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <Box sx={{ "& > :not(style)": { m: 1 } }} className="search-box">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            input: { color: "white" },
          }}
        >
          <TextField
            InputLabelProps={{ style: { color: "white" } }}
            id="input-with-sx"
            label="Pokemon Name or #"
            variant="outlined"
            value={searchInput}
            color="secondary"
            onChange={handleInputChange}
            className="search-box"
          />
          <Button
            type="submit"
            variant="primary"
            size="small"
            className="search-button"
          >
            Search
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default SearchBar;
