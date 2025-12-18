import { GetPokemonTypes, GetPokemonList } from "./components/SearchBar";

import { useState } from "react";

function AppBoard() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");
  return (
    <div>
      <GetPokemonTypes
        selectedType={selectedType}
        textSearch={textSearch}
        onTypeChange={setSelectedType}
        onTextSearchChange={setTextSearch}
      />
      <GetPokemonList selectedType={selectedType} textSearch={textSearch} />
    </div>
  );
}

export default AppBoard;
