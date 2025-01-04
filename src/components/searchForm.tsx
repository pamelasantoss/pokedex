import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { register, handleSubmit, watch } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  const searchField = watch("query")

  const handleSearchPokemon = async (data: SearchFormInputs) => {
    console.log(data.query)
  }

  return (
    <form
      className="flex mt-3 w-full"
      onSubmit={handleSubmit(handleSearchPokemon)}
    >
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Search for a pokemon"
          {...register("query")}
        />
        <Button type="submit" disabled={!searchField}>
          Search
        </Button>
      </div>
    </form>
  )
}