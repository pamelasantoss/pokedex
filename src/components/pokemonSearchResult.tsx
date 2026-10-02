import { usePokemonDetails } from "@/hooks/usePokemonDetails"
import { PokemonCardLoading } from "./pokemonCardLoading"
import { PokemonCardContent } from "./pokemonCardContent"

export function PokemonSearchResult({
  query
}: {
  query: ReturnType<typeof usePokemonDetails>
}) {
  if (query.isLoading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
        <PokemonCardLoading items={1} />
      </div>
    )
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex py-10 flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">
          Sorry, we couldn't find your Pokémon...
        </h1>

        <p className="text-accent-foreground">Try again!</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
      <PokemonCardContent pokemon={query.data} />
    </div>
  )
}
