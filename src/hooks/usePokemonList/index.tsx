import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPokemonsList } from "../../services/getPokemonsList"

export function usePokemonList(pageIndex: number, limit: number) {
  return useQuery({
    queryKey: ["pokemon-list", { pageIndex, limit }],
    queryFn: () =>
      getPokemonsList({
        pageIndex,
        limit
      }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
