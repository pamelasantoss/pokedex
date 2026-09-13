import { api } from "../lib/axios"

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

interface PokemonDetailsApiResponse {
  id: number
  name: string
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
  sprites: {
    other: {
      dream_world: {
        front_default: string | null
      }
    }
  }
}

export const getPokemonDetails = async (
  name: string
): Promise<PokemonDetailsResponse> => {
  const response = await api.get<PokemonDetailsApiResponse>(
    `/pokemon/${name.toLowerCase()}`
  )

  const pokemonData = response.data

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.other.dream_world.front_default ?? "",
    height: pokemonData.height,
    weight: pokemonData.weight,
    forms: pokemonData.forms,
    abilities: pokemonData.abilities,
    moves: pokemonData.moves,
    types: pokemonData.types
  }
}
