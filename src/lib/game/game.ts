import { generateBoard } from 'src/lib/board'
import { generatePieces } from 'src/lib/piece'
import { GameObject, GameObjectLike } from '@/types'

export function generateGameObject(config: GameObjectLike = {}): GameObject {
  return {
    status: `ready`,
    playerTurn: `white`,
    boardRows: generateBoard(),
    pieces: generatePieces(),
    validMoves: [],
    validAttacks: [],
    history: [],
    ...config,
  }
}
