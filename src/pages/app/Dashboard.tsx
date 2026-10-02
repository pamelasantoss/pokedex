import { Helmet } from "react-helmet-async"
import { Dialog } from "@radix-ui/react-dialog"
import { useNavigate, useSearchParams } from "react-router-dom"
import { z } from "zod"
import { useState } from "react"

import { SearchForm } from "../../components/searchForm"
import { PokemonCard } from "../../components/pokemonCard"
import { PokemonDetail } from "../../components/pokemonDetail"
import { PokemonPagination } from "../../components/pokemonPagination"
import { PokemonCardLoading } from "@/components/pokemonCardLoading"

import { usePokemonList } from "../../hooks/usePokemonList"
import { usePokemonDetails } from "../../hooks/usePokemonDetails"
import { useAuth } from "../../hooks/useAuth"

import type { PokemonDetailsResponse } from "../../services/getPokemonDetails"

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

  const isSearching = Boolean(pokemonSearch.trim())

  const pokemonListQuery = usePokemonList(pageIndex, itemsPerPage)

  const pokemonDetailsQuery = usePokemonDetails(pokemonSearch)

  function handlePokemonSearch(query: string) {
    setPokemonSearch(query)

    if (query.trim()) {
      setSearchParams(state => {
        state.set("page", "1")
        return state
      })
    }
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

        {isSearching ? (
          <PokemonSearchResult query={pokemonDetailsQuery} />
        ) : (
          <PokemonList
            query={pokemonListQuery}
            pageIndex={pageIndex}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </>
  )
}

function PokemonSearchResult({
  query
}: {
  query: ReturnType<typeof usePokemonDetails>
}) {
  /*
   * Primeiro carregamento da busca.
   *
   * Como ainda não temos nenhum dado para esse Pokémon,
   * mostramos o skeleton.
   */
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

function PokemonList({
  query,
  pageIndex,
  itemsPerPage,
  onPageChange
}: {
  query: ReturnType<typeof usePokemonList>
  pageIndex: number
  itemsPerPage: number
  onPageChange: (pageIndex: number) => void
}) {
  /*
   * Primeiro carregamento da lista.
   *
   * Nesse momento ainda não temos dados.
   */
  if (query.isLoading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
        <PokemonCardLoading items={itemsPerPage} />
      </div>
    )
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex py-10 flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">
          Sorry, we couldn't load the Pokémon...
        </h1>

        <p className="text-accent-foreground">Try again!</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        {/*
         * Durante a troca de página, keepPreviousData
         * mantém os cards antigos na tela.
         *
         * isFetching permite indicar que uma nova página
         * está sendo carregada sem substituir os cards
         * por skeletons.
         */}
        {query.isFetching && (
          <div className="absolute right-0 -top-8 text-sm text-muted-foreground">
            Carregando...
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          {query.data.results.map(pokemon => (
            <PokemonListCard key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      </div>

      <PokemonPagination
        totalCount={query.data.count}
        pageIndex={pageIndex}
        perPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </>
  )
}

function PokemonListCard({ name }: { name: string }) {
  const query = usePokemonDetails(name)

  /*
   * Cada card possui sua própria query.
   *
   * Isso significa que os detalhes de cada Pokémon
   * também ficam individualmente no cache.
   */
  if (query.isLoading) {
    return <PokemonCardLoading items={1} />
  }

  if (query.isError || !query.data) {
    return null
  }

  return <PokemonCardContent pokemon={query.data} />
}

function PokemonCardContent({ pokemon }: { pokemon: PokemonDetailsResponse }) {
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
