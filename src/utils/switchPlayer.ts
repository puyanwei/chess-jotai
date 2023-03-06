import { PlayerColor } from '@/types'

export function switchPlayer(activePlayer: PlayerColor): PlayerColor {
  return activePlayer === `black` ? `white` : `black`
}
