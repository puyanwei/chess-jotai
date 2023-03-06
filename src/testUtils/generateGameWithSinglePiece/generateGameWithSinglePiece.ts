import { GameObject, Piece } from '@/types'
import { generateInitialPieceState } from 'src/constants/piecesInitialState'
import { generateGameObject } from 'src/lib/game'

export function generateGameWithSinglePiece(pieceId: Piece[`id`]): GameObject {
  const kingPiece = generateInitialPieceState().find(
    p => p.id === pieceId
  ) as Piece

  const game = generateGameObject({ pieces: [kingPiece] })
  return game
}
