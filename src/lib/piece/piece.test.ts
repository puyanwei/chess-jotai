import { BoardPosition, Piece } from '@/types'
import { generateGameWithSinglePiece } from 'src/testUtils/generateGameWithSinglePiece'
import {
  ensureNewPositionIsValid,
  findClosestOccupiedPosition,
  findClosestOccupiedPositions,
  resolveBoardPositionsByOrientation,
  resolveOrientationOfTwoPositions,
  resolveValidPieceMoves,
} from '.'
import { generateGameObject } from '../game'

describe(`generate pieces`, () => {
  it(`all needed pieces are generated`, () => {
    const game = generateGameObject()
    const { pieces } = game

    expect(pieces.filter(p => p.player === `black`).length).toEqual(16)
    expect(pieces.filter(p => p.player === `white`).length).toEqual(16)

    expect(pieces.filter(p => p.name === `pawn`).length).toEqual(16)
    expect(pieces.filter(p => p.name === `rook`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `bishop`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `knight`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `queen`).length).toEqual(2)
    expect(pieces.filter(p => p.name === `king`).length).toEqual(2)
  })

  it(`all initial piece positions are correct`, () => {
    const game = generateGameObject()
    const { pieces } = game

    const pawn = pieces.filter(p => p.name === `pawn`)
    expect(pawn[0]?.position).toEqual([1, 7])

    const rook = pieces.filter(p => p.name === `rook`)
    expect(rook[0]?.position).toEqual([1, 8])

    const bishop = pieces.filter(p => p.name === `bishop`)
    expect(bishop[0]?.position).toEqual([3, 8])

    const knight = pieces.filter(p => p.name === `knight`)
    expect(knight[0]?.position).toEqual([2, 8])

    const queen = pieces.filter(p => p.name === `queen`)
    expect(queen[0]?.position).toEqual([5, 8])

    const king = pieces.filter(p => p.name === `king`)
    expect(king[0]?.position).toEqual([4, 8])
  })
})

describe(`resolveValidPieceMoves`, () => {
  it(`returns all valid piece moves using default movement range when not first move`, () => {
    const whiteKingGame = generateGameWithSinglePiece(`white-king-1`)
    const king = whiteKingGame.pieces.find(
      p => p.id === `white-king-1`
    ) as Piece
    king.position = [4, 7]
  })

  it(`returns all valid piece moves using default movement range when first move`, () => {
    const whiteKingGame = generateGameWithSinglePiece(`white-king-1`)
    const king = whiteKingGame.pieces.find(
      p => p.id === `white-king-1`
    ) as Piece
    const whiteKingValidMoves = resolveValidPieceMoves(king, whiteKingGame)
    expect(whiteKingValidMoves).toEqual([
      [4, 7],
      [5, 7],
      [5, 8],
      [5, 9],
      [4, 9],
      [3, 9],
      [3, 8],
      [3, 7],
    ])

    const blackPawnGame = generateGameWithSinglePiece(`black-pawn-1`)
    const pawn = blackPawnGame.pieces.find(
      p => p.id === `black-pawn-1`
    ) as Piece

    const pawnValidMoves = resolveValidPieceMoves(pawn, blackPawnGame)
    expect(pawnValidMoves).toEqual([
      [1, 3],
      [1, 4],
    ])
  })

  it.todo(
    `does not return any positions in range that are occupied by other pieces`
  )

  it.todo(
    `allows knights to move into any vacant spaces in range even when obstructed by other pieces`
  )

  it.todo(
    `prevents none-knights from moving into any vacant spaces in range that are obstructed by other pieces`
  )
})

describe(`ensureNewPositionIsValid`, () => {
  it(`returns true where the move provided is a valid move of the piece provided`, () => {
    const blackPawnGame = generateGameWithSinglePiece(`black-pawn-1`)
    const pawn = blackPawnGame.pieces.find(
      p => p.id === `black-pawn-1`
    ) as Piece
    expect(ensureNewPositionIsValid(pawn, [1, 3], blackPawnGame)).toEqual(true)
    expect(ensureNewPositionIsValid(pawn, [1, 4], blackPawnGame)).toEqual(true)
  })

  it(`returns false where the move provided is not a valid move of the piece provided`, () => {
    const blackPawnGame = generateGameWithSinglePiece(`black-pawn-1`)
    const pawn = blackPawnGame.pieces.find(
      p => p.id === `black-pawn-1`
    ) as Piece
    expect(ensureNewPositionIsValid(pawn, [1, 5], blackPawnGame)).toEqual(false)
  })
})

describe(`resolveOrientationOfTwoPositions`, () => {
  it(`should return an orientation calculated using two provided board positions`, () => {
    expect(resolveOrientationOfTwoPositions([1, 1], [1, 2])).toEqual(`down`)

    expect(resolveOrientationOfTwoPositions([1, 4], [1, 2])).toEqual(`up`)

    expect(resolveOrientationOfTwoPositions([1, 1], [3, 1])).toEqual(`right`)

    expect(resolveOrientationOfTwoPositions([6, 1], [3, 1])).toEqual(`left`)

    expect(resolveOrientationOfTwoPositions([3, 3], [1, 1])).toEqual(`up-left`)

    expect(resolveOrientationOfTwoPositions([1, 3], [3, 1])).toEqual(`up-right`)

    expect(resolveOrientationOfTwoPositions([3, 1], [1, 3])).toEqual(
      `down-left`
    )

    expect(resolveOrientationOfTwoPositions([1, 1], [3, 3])).toEqual(
      `down-right`
    )
  })
})

describe(`resolveBoardPositionsByOrientation`, () => {
  it(`returns all board positions in one orientation relative to the provided position`, () => {
    expect(resolveBoardPositionsByOrientation([4, 4], `up`)).toEqual([
      [4, 3],
      [4, 2],
      [4, 1],
      [4, 0],
    ])
  })
})

describe(`findClosestOccupiedPosition`, () => {
  it(`returns the occupied position closest to the provided current position`, () => {
    expect(
      findClosestOccupiedPosition(
        [4, 4],
        [
          [4, 6],
          [4, 3],
          [4, 2],
          [4, 1],
        ],
        `up`
      )
    ).toEqual([4, 3])
  })
})

describe(`findClosestOccupiedPositions`, () => {
  it(`returns an object of closest occupied positions`, () => {
    const obstructionObject = {
      up: undefined,
      'up-right': undefined,
      right: undefined,
      'down-right': undefined,
      down: undefined,
      'down-left': undefined,
      left: undefined,
      'up-left': undefined,
    }

    const currentPosition: BoardPosition = [4, 4]
    const occupiedPositions: BoardPosition[] = [
      [4, 2],
      [4, 1],
      [5, 4],
    ]
    expect(
      findClosestOccupiedPositions(currentPosition, occupiedPositions)
    ).toEqual({
      ...obstructionObject,
      up: [4, 2],
      right: [5, 4],
    })
  })
})

describe(`promotePieceIfValid`, () => {
  it.todo(`removes the selected piece if promoted`)
  it.todo(`adds an additional queen if promoted`)
})