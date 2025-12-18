export function createPaginator(offset: number, limit: number, total?: number) {
  const currentPage = Math.floor(offset / limit) + 1;

  return {
    currentPage,
    hasPrevious: offset > 0,
    hasNext: total ? offset + limit < total : true,
    nextOffset: offset + limit,
    previousOffset: Math.max(0, offset - limit),
  };
}
