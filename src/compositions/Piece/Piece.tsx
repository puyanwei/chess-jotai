import { Component, Piece, Piece as PieceInterface } from '@/types'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { useGameObject } from 'src/stores/GameObjectStore'

interface Props extends Component {
  piece: PieceInterface
  disabled?: boolean
}

export function Piece({
  piece,
  className = ``,
  disabled = false,
  testId = `piece`,
}: Props) {
  const piecePositionClassName = resolveGridPositionClassNameFromBoardPosition(
    piece.position
  )
  const [gameObject, dispatch] = useGameObject()

  const isHighlighted = gameObject.selectedPiece === piece

  function handlePieceClick(
    piece: PieceInterface,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation()

    const isTargetPieceAnOpponent = piece.player !== gameObject.playerTurn
    const isTargetPieceSameAsSelectedPiece = piece === gameObject.selectedPiece
    const isTargetPieceAnUnselectedPlayerPiece =
      !isTargetPieceAnOpponent && !isTargetPieceSameAsSelectedPiece

    if (isTargetPieceSameAsSelectedPiece) {
      dispatch({ type: `select`, piece: undefined })
      return
    }

    if (isTargetPieceAnUnselectedPlayerPiece && !isTargetPieceAnOpponent) {
      dispatch({ type: `select`, piece })
      return
    }
      

    if (isTargetPieceAnOpponent && !!gameObject.selectedPiece) {
      
      dispatch({
        type: `attack`,
        piece: gameObject.selectedPiece as Piece,
        enemyPiece: piece,
      })
    }
  }

  const variants = {
    white: {
      initial: `bg-white border-2 font-bold border-slate-700 text-slate-700`,
      selected: `bg-white border-2 font-bold border-slate-700 bg-rose-300 `,
    },
    black: {
      initial: `text-white bg-slate-700 border-2 border-white font-semibold`,
      selected: `bg-rose-700 text-white  border-2 border-white  font-semibold`,
    },
  }

  return (
    <button
      data-testid={testId}
      data-position={piece.position.join(`,`)}
      id={`piece-${piece.id}`}
      className={`flex items-center justify-center pointer-events-auto drop-shadow-md ${
        isHighlighted ? `` : ``
      } ${piecePositionClassName} ${className}`}
      key={piece.id}
      onClick={e => handlePieceClick(piece, e)}
      disabled={disabled}
    >
      <span
        className={`inline-block pt-2 pb-2.5 px-3.5 w-[84px] leading-none rounded-[2em] select-none ${
          isHighlighted
            ? variants[piece.player].selected
            : variants[piece.player].initial
        }`}
      >
        {piece.name}
      </span>
    </button>
  )
}
