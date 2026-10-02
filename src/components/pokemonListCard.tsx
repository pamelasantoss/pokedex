import { usePokemonDetails } from "@/hooks/usePokemonDetails"
import { PokemonCardLoading } from "./pokemonCardLoading"
import { PokemonCardContent } from "./pokemonCardContent"

export function PokemonListCard({ name }: { name: string }) {
  const query = usePokemonDetails(name)

  /*
   * Each card has its own query.
   *
   * This means that the details for each Pokémon
   * are also cached individually.
   */
  if (query.isLoading) {
    return <PokemonCardLoading items={1} />
  }

  if (query.isError || !query.data) {
    return null
  }

  return <PokemonCardContent pokemon={query.data} />
}
