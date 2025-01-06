import { api } from "../lib/axios"

export interface PokemonListQuery {
  pageIndex: number
  limit: number
  searchPokemon?: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonDetailsResponse {
  id?: number
  name: string
  image: string
  height: number
  weight: number
  forms: {
    name: string
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  moves: {
    move: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
}

export const getPokemonsList = async ({
  pageIndex,
  limit,
  searchPokemon
}: PokemonListQuery) => {
  const offset = pageIndex

  const pokemonList = await api.get<PokemonListResponse>("pokemon", {
    params: {
      offset,
      limit
    }
  })

  const pokemonResults = pokemonList.data

  if (searchPokemon) {
    try {
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLocaleLowerCase()}`
      )
      const pokemonData = await pokemonResponse.json()

      const searchedPokemon: PokemonDetailsResponse = {
        name: pokemonData.name,
        image: pokemonData.sprites.other.dream_world.front_default,
        id: pokemonData.id,
        height: pokemonData.height,
        weight: pokemonData.weight,
        forms: pokemonData.forms,
        abilities: pokemonData.abilities,
        moves: pokemonData.moves,
        types: pokemonData.types
      }

      return {
        pokemonResults: {
          count: 1,
          next: null,
          previous: null,
          results: [{ name: searchPokemon, url: pokemonData.url }]
        },
        pokemonsDetails: [searchedPokemon]
      }
    } catch (error) {
      console.error(
        `Pokemon "${searchPokemon}" not found. Try again later.`,
        error
      )
      return {
        pokemonResults: {
          count: 0,
          next: null,
          previous: null,
          results: []
        },
        pokemonsDetails: []
      }
    }
  } else {
    const pokemonsDetails: PokemonDetailsResponse[] = await Promise.all(
      pokemonList.data.results.map(async pokemon => {
        const pokemonResponse = await fetch(
          pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        )
        const pokemonData = await pokemonResponse.json()

        return {
          name: pokemon.name,
          image: pokemonData.sprites.other.dream_world.front_default,
          id: pokemonData.id,
          height: pokemonData.height,
          weight: pokemonData.weight,
          forms: pokemonData.forms,
          abilities: pokemonData.abilities,
          moves: pokemonData.moves,
          types: pokemonData.types
        }
      })
    )

    return {
      pokemonResults,
      pokemonsDetails
    }
  }
}
