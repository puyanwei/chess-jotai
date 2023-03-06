import { ReactNode } from 'react'

export interface Component {
  children?: ReactNode | string
  className?: string
  testId?: string
}

// Boards
export interface BoardCell {
  position: BoardPosition
}
export type BoardRows = BoardCell[][]
export type BoardPosition = [BoardPositionNode, BoardPositionNode]
export type BoardPositionNode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type PositionAdjustmentAmount =
  | -1
  | -2
  | -3
  | -4
  | -5
  | -6
  | -7
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7

// Pieces
export type PieceName = `pawn` | `knight` | `bishop` | `rook` | `queen` | `king`

export type PlayerColor = `white` | `black`

export type PieceStatus = `init` | `inPlay` | `taken` | `promoted`

export type PieceMovementRange = [number, number, number, number][]

export type PieceId =
  | `white-rook-1`
  | `white-rook-2`
  | `white-bishop-1`
  | `white-bishop-2`
  | `white-knight-1`
  | `white-knight-2`
  | `white-king-1`
  | `white-queen-1`
  | `white-pawn-1`
  | `white-pawn-2`
  | `white-pawn-3`
  | `white-pawn-4`
  | `white-pawn-5`
  | `white-pawn-6`
  | `white-pawn-7`
  | `white-pawn-8`
  | `black-rook-1`
  | `black-rook-2`
  | `black-bishop-1`
  | `black-bishop-2`
  | `black-knight-1`
  | `black-knight-2`
  | `black-king-1`
  | `black-queen-1`
  | `black-pawn-1`
  | `black-pawn-2`
  | `black-pawn-3`
  | `black-pawn-4`
  | `black-pawn-5`
  | `black-pawn-6`
  | `black-pawn-7`
  | `black-pawn-8`
export interface Piece {
  id: PieceId | string
  name: PieceName
  position: BoardPosition
  status: PieceStatus
  movementRange: MovementRange
  initialMovementRange: MovementRange
  attackRange: AttackRange
  player: PlayerColor
}

export type Orientation =
  | `up`
  | `up-right`
  | `right`
  | `down-right`
  | `down`
  | `down-left`
  | `left`
  | `up-left`

export type UpDistance = number
export type RightDistance = number
export type BottomDistance = number
export type LeftDistance = number

export type MovementRange = [
  UpDistance,
  RightDistance,
  BottomDistance,
  LeftDistance
][]

export type AttackRange = [
  UpDistance,
  RightDistance,
  BottomDistance,
  LeftDistance
][]

export interface PieceDefinitions {
  name: PieceName
  movementRange: MovementRange
}

export type HistoryEntry = MoveHistoryEvent | AttackHistoryEvent

export interface MoveHistoryEvent {
  currentPosition: BoardPosition
  action: `move`
  pieceId: Piece[`id`]
  targetPosition: BoardPosition
  player: PlayerColor
}
export interface AttackHistoryEvent {
  currentPosition: BoardPosition
  action: `attack`
  pieceId: Piece[`id`]
  targetPieceId: Piece[`id`]
  targetPosition: BoardPosition
}

// Game Object
export interface GameObject {
  status: `loading` | `ready` | `whiteWon` | `blackWon`
  playerTurn: PlayerColor
  boardRows: BoardRows
  pieces: Piece[]
  selectedPiece?: Piece
  validMoves: BoardPosition[]
  validAttacks: Piece[]
  history: HistoryEntry[]
}

export type GameObjectLike = Partial<GameObject>
