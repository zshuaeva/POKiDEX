import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemonId: null,
  pokemonName: null,
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
  },
});

export const { setPokemonId, setPokemonName } = pokemonSlice.actions;
export default pokemonSlice.reducer;
