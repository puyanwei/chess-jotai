import { BoardPosition, Component } from '@/types'
import { BoardCell } from 'src/compositions/BoardCell'
import { useGameObject } from 'src/stores/GameObjectStore/GameObjectStore'

interface Props extends Component {}

export function BoardGrid({
  className = ``,
  testId = `board-underlay`,
}: Props) {
  const [gameObject, dispatch] = useGameObject()

  const allValidPositions = [
    ...gameObject.validMoves,
    ...gameObject.validAttacks.map(a => a.position),
  ]

  function handleCellClick(position: BoardPosition) {
    const piece = gameObject.selectedPiece
    
    if (piece) {
      dispatch({ type: `move`, piece, position })
    }
  }

  return (
    <div
      className={`grid grid-cols-8 shadow-xl ${className}`}
      data-testid={testId}
    >
      {gameObject.boardRows.map((row, rowIndex) =>
        row.map(cell => {
          const cellTheme = rowIndex % 2 === 1 ? `odd` : `even`

          const isHighlighted = allValidPositions.some(
            move => move[0] === cell.position[0] && move[1] === cell.position[1]
          )

          const cellNumber = cell.position.join(``)
          return (
            <BoardCell
              key={cellNumber}
              cell={cell}
              cellTheme={cellTheme}
              isHighlighted={isHighlighted}
              onClick={() => handleCellClick(cell.position)}
            />
          )
        })
      )}
    </div>
  )
}
