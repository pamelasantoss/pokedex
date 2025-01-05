import { Helmet } from "react-helmet-async"
import { SearchForm } from "../../components/searchForm"
import { PokemonCard } from "../../components/pokemonCard"

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="flex w-full">
          <SearchForm />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
        </div>
      </div>
    </>
  )
}
