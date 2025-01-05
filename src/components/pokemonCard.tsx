import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"

export function PokemonCard() {
  return (
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
        <Button className="w-full">More details</Button>
      </CardFooter>
    </Card>
  )
}
