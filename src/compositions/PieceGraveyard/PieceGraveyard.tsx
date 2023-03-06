import { Component } from '@/types'
import { useGameObject } from 'src/stores/GameObjectStore'
import { Piece } from '../Piece/Piece'

export interface Props extends Component {}

export function PieceGraveyard({
  className = ``,
  testId = `piece-graveyard`,
}: Props) {
  const [game] = useGameObject()

  const takenPieces = game.pieces.filter(piece => piece.status === `taken`)

  const whiteTakenPieces = takenPieces.filter(piece => piece.player === `white`)
  const blackTakenPieces = takenPieces.filter(piece => piece.player === `black`)

  return (
    <div
      className={`${className} grid-cols-2 hidden xl:grid p-4`}
      data-testid={testId}
    >
      <div className="flex flex-col items-start gap-2">
        {whiteTakenPieces.map(piece => (
          <div className="p-2 pointer-events-none" key={piece.id}>
            <Piece piece={piece} disabled />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-2">
        {blackTakenPieces.map(piece => (
          <div className="p-2 pointer-events-none" key={piece.id}>
            <Piece piece={piece} disabled />
          </div>
        ))}
      </div>
    </div>
  )
}
