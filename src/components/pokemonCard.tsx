import { PokemonDetail } from "./pokemonDetail"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"
import { Dialog, DialogTrigger } from "./ui/dialog"

export function PokemonCard() {
  return (
    <Dialog>
      <Card>
        <CardHeader>
          <CardTitle>Bulbasaur</CardTitle>
          <CardDescription>#1</CardDescription>
        </CardHeader>
        <CardContent className="flex align-middle justify-center">
          <img
            src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/001.png"
            alt=""
          />
        </CardContent>
        <CardFooter>
          <DialogTrigger asChild>
            <Button className="w-full">More details</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <PokemonDetail
        name="Bulbasaur"
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/001.png"
      />
    </Dialog>
  )
}
