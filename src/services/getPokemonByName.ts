import { api } from "../lib/axios"

interface PokemonQuery {
  name: string
}

export const getPokemonByName = async ({ name }: PokemonQuery) => {
  const pokemon = await api.get(`pokemon/${name.toLocaleLowerCase()}`)

  return pokemon.data
}
