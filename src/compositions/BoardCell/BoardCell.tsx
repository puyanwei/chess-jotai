import { BoardCell as BoardCellInterface, Component } from '@/types'

interface Props extends Component {
  cell: BoardCellInterface
  cellTheme: `odd` | `even`
  isHighlighted?: boolean
  onClick?: () => void
}

const variants = {
  standardColours: {
    odd: `odd:bg-slate-100 even:bg-slate-700 odd:text-black even:text-white`,
    even: `even:bg-slate-100 odd:bg-slate-700 odd:text-white even:text-black`,
  },
  highlightedColours: {
    odd: `odd:bg-teal-200 even:bg-teal-600 odd:text-black even:text-white`,
    even: `even:bg-teal-200 odd:bg-teal-600 odd:text-white even:text-black`,
  },
}

export function BoardCell({
  cell,
  cellTheme,
  isHighlighted,
  onClick,
  testId = `board-cell`,
}: Props) {
  const cellNumber = cell.position.join(``)
  return (
    <div
      data-testid={testId}
      id={`board-cell-${cellNumber}`}
      onClick={onClick}
      className={`bg-white flex items-center justify-center ${
        isHighlighted
          ? variants.highlightedColours[cellTheme]
          : variants.standardColours[cellTheme]
      }`}
      key={cellNumber}
      data-is-highlighted={isHighlighted ? true : null}
    >
      <span className="select-none opacity-30">{`${cell.position.toString()}`}</span>
    </div>
  )
}
