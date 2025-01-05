import { Helmet } from "react-helmet-async"
import { SearchForm } from "../../components/searchForm"
import { PokemonCard } from "../../components/pokemonCard"
import { usePokemonList } from "../../hooks/usePokemonList"
import { Dialog } from "@radix-ui/react-dialog"
import { PokemonDetail } from "../../components/pokemonDetail"
import { PokemonPagination } from "../../components/pokemonPagination"
import { z } from "zod"
import { useSearchParams } from "react-router-dom"

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform(page => page - 1)
    .parse(searchParams.get("page") ?? "1")
  const itemsPerPage = 8

  const { pokemonsList } = usePokemonList(pageIndex, itemsPerPage)

  function handlePaginate(pageIndex: number) {
    setSearchParams(state => {
      state.set("page", (pageIndex + 1).toString())
      return state
    })
  }

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="flex w-full">
          <SearchForm />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pokemonsList?.pokemonsDetails.map(pokemon => (
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

        <PokemonPagination
          totalCount={pokemonsList?.pokemonResults.count}
          pageIndex={pageIndex}
          perPage={itemsPerPage}
          onPageChange={handlePaginate}
        />
      </div>
    </>
  )
}
