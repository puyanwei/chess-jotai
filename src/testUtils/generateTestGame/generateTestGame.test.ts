import { generateTestGame } from './generateTestGame'

describe(`generateGame`, () => {
  it(`returns a game with a blank board by default`, () => {
    const game = generateTestGame([])
    expect(game.pieces).toEqual([])
  })

  it(`places a piece on the board for each pieceSeed provided`, () => {
    const game = generateTestGame([
      { pieceId: `black-pawn-1`, position: [1, 2] },
      { pieceId: `white-pawn-1`, position: [1, 3] },
    ])
    expect(game.pieces).toEqual([
      {
        attackRange: [
          [1, 1, 0, 0],
          [1, 0, 0, 1],
        ],
        id: `black-pawn-1`,
        initialMovementRange: [
          [1, 0, 0, 0],
          [2, 0, 0, 0],
        ],
        movementRange: [[1, 0, 0, 0]],
        name: `pawn`,
        player: `black`,
        position: [1, 2],
        status: `init`,
      },
      {
        attackRange: [
          [0, 1, 1, 0],
          [0, 0, 1, 1],
        ],
        id: `white-pawn-1`,
        initialMovementRange: [
          [0, 0, 1, 0],
          [0, 0, 2, 0],
        ],
        movementRange: [[0, 0, 1, 0]],
        name: `pawn`,
        player: `white`,
        position: [1, 3],
        status: `init`,
      },
    ])
  })
})
