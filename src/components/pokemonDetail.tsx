import { Rotate3D, Ruler, Sparkle, Waves, Weight } from "lucide-react"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog"

interface PokemonDetailProps {
  name: string
  image: string
}

export function PokemonDetail({ name, image }: PokemonDetailProps) {
  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>{name}</DialogTitle>
        <DialogDescription className="flex gap-2 pt-2">
          {/* Type */}
          <span className="h-6 px-2 flex justify-center items-center bg-muted-foreground text-primary-foreground">
            grass
          </span>
          <span className="h-6 px-2 flex justify-center items-center bg-muted-foreground text-primary-foreground">
            poison
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col md:flex-row gap-4 py-4">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold flex items-center gap-1">
              <Weight className="h-4 w-4" />
              Weight
            </h3>
            <p>130 {/* The weight of this Pokémon in hectograms. */}</p>
          </div>

          <div>
            <h3 className="font-semibold flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              Height
            </h3>
            <p>10 {/* The height of this Pokémon in decimetres. */}</p>
          </div>

          <div>
            <h3 className="font-semibold flex items-center gap-1">
              <Rotate3D className="h-4 w-4" />
              Forms
            </h3>
            <p className="capitalize">ivysaur</p>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <img src={image} alt="" className="max-w-[100%]" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold flex items-center gap-1">
            <Sparkle className="h-4 w-4" />
            Abilities
          </h3>
          <p>overgrow: lorem ipsum</p>
          <p>chlorophyll: lorem ipsum</p>
        </div>

        <div>
          <h3 className="font-semibold flex items-center gap-1">
            <Waves className="h-4 w-4" />
            Moves
          </h3>
          <p>swords-dance: lorem ipsum</p>
          <p>cut: lorem ipsum</p>
          <p>bind: lorem ipsum</p>
          <p>Vine-whip: lorem ipsum</p>
        </div>
      </div>
    </DialogContent>
  )
}
