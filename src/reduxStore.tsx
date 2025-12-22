import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./store/pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
