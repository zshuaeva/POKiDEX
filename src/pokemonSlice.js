import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemonId: null,
  pokemonName: null,
  flavorText: '',
  height: null,
  weight: null,
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
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload
    }
  },
});

export const { setPokemonId, setPokemonName, setFlavorText, setHeight, setWeight } = pokemonSlice.actions;

export const selectHeight = (state) => state.pokemon.height;
export const selectWeight = (state) => state.pokemon.weight;
export const selectFlavorText = (state) => state.pokemon.flavorText;

export default pokemonSlice.reducer;
