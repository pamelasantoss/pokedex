import { useQuery } from "@tanstack/react-query"
import { getPokemonsList } from "../../services/getPokemons"

export function usePokemonList(
  pageIndex: number,
  limit: number,
  searchPokemon?: string
) {
  const { data: pokemonsList, isLoading } = useQuery({
    queryKey: ["pokemon-list", pageIndex, searchPokemon],
    queryFn: async () =>
      getPokemonsList({
        pageIndex,
        limit,
        searchPokemon
      })
  })

  return {
    pokemonsList,
    isLoading
  }
}
