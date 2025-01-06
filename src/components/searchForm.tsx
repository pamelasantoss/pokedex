import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { ChangeEvent } from "react"

interface SearchFormProps {
  onSearch: (query: string) => void
}

const searchFormSchema = z.object({
  query: z.string().min(1)
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm({ onSearch }: SearchFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<SearchFormInputs>(
    {
      resolver: zodResolver(searchFormSchema),
      mode: "onChange",
      reValidateMode: "onChange"
    }
  )

  const searchField = watch("query")

  function handleSearchPokemon(data: SearchFormInputs) {
    onSearch(data.query)
  }

  function handleChangeSearchPokemon(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setValue("query", value, { shouldValidate: true })

    if (value === "") {
      onSearch(value)
    }
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
          onChange={handleChangeSearchPokemon}
        />
        <Button type="submit" disabled={!searchField}>
          <Search className="h-5 w-5" />
          Search
        </Button>
      </div>
    </form>
  )
}
