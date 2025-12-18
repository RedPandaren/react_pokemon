import { GetPokemonTypes, GetPokemonList } from "./components/SearchBar";
import { useState } from "react";
function App() {
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <div>
      <GetPokemonTypes
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <GetPokemonList selectedType={selectedType} />
    </div>
  );
}

export default App;
