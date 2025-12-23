export const useFetchQuery = () => {
  return {
    getPokemonList: () => {
      const valueName = "james";
      return {
        Name: valueName,
        number: 2,
      };
    },
  };
};
