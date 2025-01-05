import { useQuery } from "@tanstack/react-query"
import { getPokemonsList } from "../../services/getPokemons"

export function usePokemonList(pageIndex: number, limit: number) {
  const { data: pokemonsList, isLoading } = useQuery({
    queryKey: ["pokemon-list", pageIndex],
    queryFn: async () =>
      getPokemonsList({
        pageIndex,
        limit
      })
  })

  return {
    pokemonsList,
    isLoading
  }
}
