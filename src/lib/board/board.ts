import { BoardRows, BoardPosition, BoardCell } from '@/types'

const gridColumnClassNames = {
  1: `col-start-1`,
  2: `col-start-2`,
  3: `col-start-3`,
  4: `col-start-4`,
  5: `col-start-5`,
  6: `col-start-6`,
  7: `col-start-7`,
  8: `col-start-8`,
}

const gridRowClassNames = {
  8: `row-start-8`,
  7: `row-start-7`,
  6: `row-start-6`,
  5: `row-start-5`,
  4: `row-start-4`,
  3: `row-start-3`,
  2: `row-start-2`,
  1: `row-start-1`,
}

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
