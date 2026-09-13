import { useQuery } from "@tanstack/react-query"
import { getPokemonDetails } from "../../services/getPokemonDetails"

export function usePokemonDetails(name: string) {
  const formatPokemonName = name.toLowerCase()

  return useQuery({
    queryKey: ["pokemon-details", formatPokemonName],
    queryFn: () => getPokemonDetails(formatPokemonName),
    enabled: Boolean(formatPokemonName),
    staleTime: 30 * 60 * 1000 // 30 minutes
  })
}
