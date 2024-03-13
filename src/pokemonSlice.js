import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemonId: null,
  pokemonName: null,
  flavorText: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonId: (state, action) => {
      state.pokemonId = action.payload;
    },
    setPokemonName: (state, action) => {
      state.pokemonName = action.payload;
    },
    setFlavorText: (state, action) => {
      state.flavorText = action.payload;
    },
  },
});

export const { setPokemonId, setPokemonName, setFlavorText } = pokemonSlice.actions;

export const selectFlavorText = (state) => state.pokemon.flavorText;

export default pokemonSlice.reducer;
