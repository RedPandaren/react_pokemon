import PokemonBoard from "./components/PokemonBoard";
import { useFetchQuery } from "./gateway/QueryUtils";

function AppBoard() {
  const { getPokemonList } = useFetchQuery();
  const test = getPokemonList();
  console.log(test.Name);
  return (
    <>
      <PokemonBoard />
    </>
  );
}

export default AppBoard;
