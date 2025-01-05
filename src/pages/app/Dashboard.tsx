import { Helmet } from "react-helmet-async"
import { SearchForm } from "../../components/searchForm"
import { PokemonCard } from "../../components/pokemonCard"
import { usePokemonList } from "../../hooks/usePokemonList"
import { Dialog } from "@radix-ui/react-dialog"
import { PokemonDetail } from "../../components/pokemonDetail"

export function Dashboard() {
  const { pokemonsList } = usePokemonList(1)

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="flex w-full">
          <SearchForm />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pokemonsList?.map(pokemon => (
            <Dialog key={pokemon.id}>
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
              />
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
          ))}
        </div>
      </div>
    </>
  )
}
