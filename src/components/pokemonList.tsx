import { usePokemonList } from "@/hooks/usePokemonList"
import { PokemonCardLoading } from "./pokemonCardLoading"
import { PokemonListCard } from "./pokemonListCard"
import { PokemonPagination } from "./pokemonPagination"

export function PokemonList({
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
         * When switching pages, keepPreviousData
         * keeps the previous cards on the screen.
         *
         * isFetching lets us indicate that a new page
         * is being loaded without replacing the cards
         * with skeletons.
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
