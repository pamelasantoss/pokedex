import { api } from "../lib/axios"

interface PokemonListQuery {
  pageIndex: number
  limit: number
}

interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export const getPokemonsList = async ({
  pageIndex,
  limit
}: PokemonListQuery) => {
  const offset = pageIndex * limit

  const response = await api.get<PokemonListResponse>("pokemon", {
    params: {
      offset,
      limit
    }
  })

  return response.data
}
