import { GetPokemonTypes, GetPokemonList } from "./components/PokemonBoard";

// import { useState } from "react";
// import { myGlobalContext } from "./GlobalContext";
function AppBoard() {
  return (
    <>
      {/* <myGlobalContext.Provider
        value={{ myState: selectedType, myFunction: setSelectedType }}
      > */}
      <div className="">
        <GetPokemonTypes />

        <GetPokemonList />
      </div>
      {/* </myGlobalContext.Provider> */}
    </>
  );
}

export default AppBoard;
