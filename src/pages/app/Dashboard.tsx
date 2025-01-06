import { Helmet } from "react-helmet-async"
import { SearchForm } from "../../components/searchForm"
import { PokemonCard } from "../../components/pokemonCard"
import { usePokemonList } from "../../hooks/usePokemonList"
import { Dialog } from "@radix-ui/react-dialog"
import { PokemonDetail } from "../../components/pokemonDetail"
import { PokemonPagination } from "../../components/pokemonPagination"
import { z } from "zod"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"

export function Dashboard() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [pokemonSearch, setPokemonSearch] = useState("")

  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform(page => page - 1)
    .parse(searchParams.get("page") ?? "1")
  const itemsPerPage = 10

  const { pokemonsList } = usePokemonList(
    pageIndex,
    itemsPerPage,
    pokemonSearch
  )

  function handlePokemonSearch(query: string) {
    setPokemonSearch(query)
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams(state => {
      state.set("page", (pageIndex + 1).toString())
      return state
    })
  }

  if (!isAuthenticated) {
    navigate("/sign-in")

    return <p>Loading...</p>
  }

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="flex w-full">
          <SearchForm onSearch={handlePokemonSearch} />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
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

        {pokemonsList?.pokemonResults.results.length !== 1 && (
          <PokemonPagination
            totalCount={pokemonsList?.pokemonResults.count}
            pageIndex={pageIndex}
            perPage={itemsPerPage}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </>
  )
}
