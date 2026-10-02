import { Helmet } from "react-helmet-async"
import { useNavigate, useSearchParams } from "react-router-dom"
import { z } from "zod"
import { useState } from "react"

import { SearchForm } from "../../components/searchForm"
import { PokemonSearchResult } from "@/components/pokemonSearchResult"
import { PokemonList } from "@/components/pokemonList"

import { usePokemonList } from "../../hooks/usePokemonList"
import { usePokemonDetails } from "../../hooks/usePokemonDetails"
import { useAuth } from "../../hooks/useAuth"

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
