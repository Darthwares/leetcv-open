interface Input {
  userId?: string;
  id?: string;
  page?: number;
  status?: string;
}

export function paginateData(data: any[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  return paginatedData;
}

export function filterAndPaginateData(
  data: any[],
  input: Input,
  page: number,
  limit: number
) {
  const filteredData =
    input.status !== "All"
      ? data.filter((item: any) => item.status === input.status)
      : data;

  const totalPages = Math.ceil(filteredData.length / limit);
  const isMore = page < totalPages;

  const paginatedData = paginateData(filteredData, page, limit);

  return { handle: paginatedData, isMore, totalPages };
}
