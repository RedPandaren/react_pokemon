import { GetPokemonTypes, GetPokemonList } from "./components/PokemonBoard";

import { useState } from "react";
import { myGlobalContext } from "./GlobalContext";

function AppBoard() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");

  return (
    <>
      <myGlobalContext.Provider
        value={{ myState: selectedType, myFunction: setSelectedType }}
      >
        <div className="">
          <GetPokemonTypes />

          <GetPokemonList />
        </div>
      </myGlobalContext.Provider>
    </>
  );
}

export default AppBoard;
