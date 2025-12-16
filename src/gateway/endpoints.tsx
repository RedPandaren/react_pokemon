export const POKEMON_ENDPOINTS = {
  list: (limit = 20, offset = 0) => `/pokemon?limit=${limit}&offset=${offset}`,

  detail: (nameOrId: string | number) => `/pokemon/${nameOrId}`,

  types: {
    list: "/type",
    detail: (type: string) => `/type/${type}`,
  },
};
