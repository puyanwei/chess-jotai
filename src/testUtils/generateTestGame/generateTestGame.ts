import { BoardPosition, GameObject, Piece } from '@/types'
import { generateInitialPieceState } from 'src/constants/piecesInitialState'
import { generateGameObject } from 'src/lib/game'

interface PieceSeed {
  pieceId: Piece[`id`]
  position: BoardPosition
}

export function generateTestGame(pieceSeeds: PieceSeed[]): GameObject {
  const allInitialPieces = generateInitialPieceState()
  const game = generateGameObject()

  const pieces: Piece[] = pieceSeeds.map(pieceSeed => {
    const initialPieceState = allInitialPieces.find(
      p => p.id === pieceSeed.pieceId
    ) as Piece

    return { ...initialPieceState, position: pieceSeed.position }
  })

  return { ...game, pieces }
}
