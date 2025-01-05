import { Rotate3D, Ruler, Sparkle, Waves, Weight } from "lucide-react"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog"
import { PokemonDetailsResponse } from "../services/getPokemons"

export function PokemonDetail({
  name,
  image,
  height,
  weight,
  forms,
  abilities,
  moves,
  types
}: PokemonDetailsResponse) {
  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="capitalize">{name}</DialogTitle>
        {types.length > 0 && (
          <DialogDescription className="flex gap-2 pt-2">
            {types.map(type => (
              <span
                key={type.type.name}
                className="h-6 px-2 flex justify-center items-center bg-muted-foreground text-primary-foreground"
              >
                {type.type.name}
              </span>
            ))}
          </DialogDescription>
        )}
      </DialogHeader>
      <div className="flex flex-col md:flex-row gap-4 py-4">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold flex items-center gap-1">
              <Weight className="h-4 w-4" />
              Weight
            </h3>
            <p>
              {weight} {/* The weight of this Pokémon in hectograms. */}
            </p>
          </div>

          <div>
            <h3 className="font-semibold flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              Height
            </h3>
            <p>
              {height} {/* The height of this Pokémon in decimetres. */}
            </p>
          </div>

          {forms.length > 0 && (
            <div>
              <h3 className="font-semibold flex items-center gap-1">
                <Rotate3D className="h-4 w-4" />
                Forms
              </h3>
              {forms.map(form => (
                <p key={form.name} className="capitalize">
                  {form.name}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 justify-center max-h-[150px]">
          <img src={image} alt="" className="max-w-[100%]" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {abilities.length > 0 && (
          <div>
            <h3 className="font-semibold flex items-center gap-1">
              <Sparkle className="h-4 w-4" />
              Abilities
            </h3>
            {abilities.map(ability => (
              <p key={ability.ability.name} className="capitalize">
                {ability.ability.name}
              </p>
            ))}
          </div>
        )}

        {moves.length > 0 && (
          <div>
            <h3 className="font-semibold flex items-center gap-1">
              <Waves className="h-4 w-4" />
              Moves
            </h3>
            {moves.slice(0, 5).map(move => (
              <p key={move.move.name} className="capitalize">
                {move.move.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </DialogContent>
  )
}
