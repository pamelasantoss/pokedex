import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"
import { DialogTrigger } from "./ui/dialog"

interface PokemonCardProps {
  id: number | undefined
  name: string
  image: string
}

export function PokemonCard({ id, name, image }: PokemonCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{name}</CardTitle>
        <CardDescription>#{id}</CardDescription>
      </CardHeader>
      <CardContent className="flex align-middle justify-center h-[300px]">
        <img src={image} alt="" className="max-w-[100%]" />
      </CardContent>
      <CardFooter>
        <DialogTrigger asChild>
          <Button className="w-full">More details</Button>
        </DialogTrigger>
      </CardFooter>
    </Card>
  )
}
