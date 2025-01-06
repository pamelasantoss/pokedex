import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"
import { Skeleton } from "./ui/skeleton"

interface PokemonCardProps {
  items: number
}

export function PokemonCardLoading({ items }: PokemonCardProps) {
  return Array.from({ length: items }).map((_, i) => (
    <Card key={i}>
      <CardHeader>
        <CardTitle className="capitalize">
          <Skeleton className="h-4 w-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-3" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex align-middle justify-center h-[150px]">
        <Skeleton className="h-[150px] w-full" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">More details</Button>
      </CardFooter>
    </Card>
  ))
}
