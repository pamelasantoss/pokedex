import { Dialog } from "@radix-ui/react-dialog"
import type { PokemonDetailsResponse } from "../services/getPokemonDetails"
import { PokemonCard } from "./pokemonCard"
import { PokemonDetail } from "./pokemonDetail"

export function PokemonCardContent({
  pokemon
}: {
  pokemon: PokemonDetailsResponse
}) {
  return (
    <Dialog>
      <PokemonCard id={pokemon.id} name={pokemon.name} image={pokemon.image} />

      <PokemonDetail
        name={pokemon.name}
        image={pokemon.image}
        height={pokemon.height}
        weight={pokemon.weight}
        forms={pokemon.forms}
        abilities={pokemon.abilities}
        moves={pokemon.moves}
        types={pokemon.types}
      />
    </Dialog>
  )
}
