import { createSlice } from "@reduxjs/toolkit";

interface PokemonState {
  selectedType: string;
  textSearch: string;
  selectedPokemon?: {
    name?: string | null;
    url?: string | null;
    sprite_url?: string | null;
    sprites?: {
      front_default?: string | null;
      back_default?: string | null;
    };
  } | null;
}

const initialState: PokemonState = {
  selectedType: "",
  textSearch: "",
  selectedPokemon: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },

    setTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },

    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },

    clearFilters: (state) => {
      state.selectedType = "";
      state.textSearch = "";
    },

    clearSelectedPokemon: (state) => {
      state.selectedPokemon = null;
    },
  },
});

export const {
  setSelectedType,
  setTextSearch,
  setSelectedPokemon,
  clearFilters,
  clearSelectedPokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
