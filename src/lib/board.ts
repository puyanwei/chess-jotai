import { BoardRows, BoardPosition, BoardCell } from '@/types'
import {
  gridColumnClassNames,
  gridRowClassNames,
} from 'src/constants/boardClassNames'

export function resolveGridPositionClassNameFromBoardPosition(
  boardPosition: BoardPosition
) {
  const columnClassName = gridColumnClassNames[boardPosition[0]]
  const rowClassName = gridRowClassNames[boardPosition[1]]

  return `${rowClassName} ${columnClassName}`
}

export function generateBoard(): BoardRows {
  const rows = new Array(8).fill(null).map(() => new Array(8).fill(null))

  const augmentedRows = rows.map((_, rowIndex) => {
    return new Array(8).fill(null).map(
      (_, columnIndex) =>
        ({
          position: [columnIndex + 1, rowIndex + 1],
        } as BoardCell)
    )
  })

  return augmentedRows
}
