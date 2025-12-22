interface Pokemon {
  name: string;
  url: string;
  sprit_url?: string;
}

export function pokemonMatchCase(
  pokemonList: Pokemon[],
  textSearch: string
): Pokemon[] {
  const searchText = textSearch.toLowerCase();

  return pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText)
  );
}

export function pokemonSpriteFetcher(pokemonUrl: string) {
  const parts = pokemonUrl.split("/").filter(Boolean);
  const pokemonId = parts[parts.length - 1];
  const spriteUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
    pokemonId +
    ".png";
  return spriteUrl;
}

export function insertSpriteUrl(list: Pokemon[]) {
  return list.map((pokemon) => ({
    ...pokemon,
    sprite_url: pokemonSpriteFetcher(pokemon.url),
  }));
}
