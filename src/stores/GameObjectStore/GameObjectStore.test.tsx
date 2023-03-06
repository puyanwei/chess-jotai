import { generateGameObject } from 'src/lib/game'
import { gameObjectReducer } from './GameObject.reducer'
import {
  AttackHistoryEvent,
  BoardPosition,
  MoveHistoryEvent,
  Piece,
} from '@/types'
import { generateTestGame } from 'src/testUtils/generateTestGame'

describe(`gameObjectReducer`, () => {

  describe(`select piece`, () => {
    it(`allows the current player to select a piece belonging to them`, () => {
      const game = generateGameObject()
      const selectedPiece = game.pieces.find(p => p.player === game.playerTurn)
      const result = gameObjectReducer(game, {
        type: `select`,
        piece: selectedPiece,
      })

      expect(result.selectedPiece).toEqual(selectedPiece)
    })

    it(`does not allow a player to select a piece that does not belong to them`, () => {
      const game = generateGameObject()
      const selectedPiece = game.pieces.find(p => p.player !== game.playerTurn)
      const result = gameObjectReducer(game, {
        type: `select`,
        piece: selectedPiece,
      })

      expect(result.selectedPiece).toEqual(game.selectedPiece)
    })

    it(`returns a result with no selected pieces when no piece is provided`, () => {
      const game = generateGameObject()
      game.selectedPiece = game.pieces[0]

      const result = gameObjectReducer(game, {
        type: `select`,
        piece: undefined,
      })
      expect(result.selectedPiece).toEqual(undefined)
    })

    it(`returns a result containing valid moves when selecting a piece`, () => {
      const game = generateGameObject()
      const blackLeftRook = game.pieces[0]
      const result = gameObjectReducer(game, {
        type: `select`,
        piece: blackLeftRook,
      })
      expect(result.validMoves.length).toBeGreaterThanOrEqual(1)
    })

    it(`returns a result containing valid attacks when selecting a piece`, () => {
      const game = generateGameObject()
      const pawn = game.pieces.find(p => p.name === `pawn`)
      const result = gameObjectReducer(game, {
        type: `select`,
        piece: pawn,
      })
      expect(result.validMoves.length).toBeGreaterThanOrEqual(1)
    })

    it(`deselecting a piece should set no valid moves in result`, () => {
      const game = generateGameObject()

      const result = gameObjectReducer(game, {
        type: `select`,
        piece: undefined,
      })
      expect(result.validMoves.length).toEqual(0)
    })
  })

  describe(`move piece`, () => {
    it(`moves the provided piece to the provided position`, () => {
      const game = generateGameObject()
      const piece = game.pieces.find(p => p.id === `white-pawn-1`) as Piece
      const oldPosition = piece.position

      const position: BoardPosition = [1, 8]
      const result = gameObjectReducer(game, {
        type: `move`,
        piece,
        position,
      })

      const updatedPiece = result.pieces[0]
      expect(updatedPiece?.position).not.toEqual(oldPosition)
      expect(updatedPiece?.position).toEqual(position)
    })

    it(`moving a piece should set valid moves to an empty array`, () => {
      const game = generateGameObject()
      const piece = game.pieces[0] as Piece
      const newPosition: BoardPosition = [1, 2]

      const result = gameObjectReducer(game, {
        type: `move`,
        piece,
        position: newPosition,
      })

      expect(result.validMoves.length).toEqual(0)
    })


    it(`successfully moving a piece sets the selectedPiece prop of the game object to undefined`, () => {
      const game = generateGameObject()
      const leftWhitePawn = game.pieces[8] as Piece
      const newPosition: BoardPosition = [1, 6]
      const result = gameObjectReducer(game, {
        type: `move`,
        piece: leftWhitePawn,
        position: newPosition,
      })
      expect(result.selectedPiece).toEqual(undefined)
    })

    it(`moving a piece adds a move history entry to gameObject.history`, () => {
      const game = generateGameObject()
      const leftWhitePawn = game.pieces[8] as Piece
      const newPosition: BoardPosition = [1, 6]
      const result = gameObjectReducer(game, {
        type: `move`,
        piece: leftWhitePawn,
        position: newPosition,
      })
      const moveHistoryEvent: MoveHistoryEvent = {
        action: `move`,
        pieceId: leftWhitePawn.id,
        targetPosition: newPosition,
        currentPosition: leftWhitePawn.position,
        player: game.playerTurn,
      }

      expect(result.history).toEqual([moveHistoryEvent])
    })

    it.todo(`promotes the piece to a queen if moving to the opposite side of the board and selected piece is a pawn`)
  })

  describe(`attack piece`, () => {
    it(`attack is cancelled if enemy piece is out of range`, () => {
      const game = generateGameObject()

      const selectedPiece = game.pieces.find(
        p => p.id === `white-pawn-1`
      ) as Piece
      const enemyPiece = game.pieces.find(p => p.id === `black-pawn-2`) as Piece

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      const updatedEnemyPiece = result.pieces.find(p => p.id === `black-pawn-2`)
      const updatedSelectedPiece = result.pieces.find(
        p => p.id === `white-pawn-1`
      )

      expect(updatedEnemyPiece?.position).toEqual(enemyPiece.position)
      expect(updatedSelectedPiece?.position).toEqual(selectedPiece.position)
      expect(result.history.length).toEqual(0)
    })

    it(`attacking a piece should set the enemy piece status to "taken"`, () => {
      const game = generateTestGame([
        { pieceId: `white-pawn-1`, position: [1, 5] },
        { pieceId: `black-pawn-2`, position: [2, 4] },
      ])

      const selectedPiece = game.pieces.find(
        p => p.id === `white-pawn-1`
      ) as Piece
      const enemyPiece = game.pieces.find(p => p.id === `black-pawn-2`) as Piece

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      const updatedEnemyPiece = result.pieces.find(p => p.id === `black-pawn-2`)
      expect(updatedEnemyPiece?.status).toEqual(`taken`)
    })

    it(`attacking a piece should set valid attacks to an empty array`, () => {
      const game = generateTestGame([
        { pieceId: `white-pawn-1`, position: [1, 5] },
        { pieceId: `black-pawn-2`, position: [2, 4] },
      ])

      const selectedPiece = game.pieces.find(
        p => p.id === `white-pawn-1`
      ) as Piece

      const enemyPiece = game.pieces.find(p => p.id === `black-pawn-2`) as Piece

      const gameWithSelectedPiece = gameObjectReducer(game, {
        type: `select`,
        piece: selectedPiece,
      })
      expect(gameWithSelectedPiece.validAttacks.length).toBeGreaterThanOrEqual(
        1
      )

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      expect(result.validAttacks.length).toEqual(0)
    })

    it(`attacking a piece should set valid moves to an empty array`, () => {
      const game = generateTestGame([
        { pieceId: `white-pawn-1`, position: [1, 5] },
        { pieceId: `black-pawn-2`, position: [2, 4] },
      ])

      const selectedPiece = game.pieces.find(
        p => p.id === `white-pawn-1`
      ) as Piece

      const enemyPiece = game.pieces.find(p => p.id === `black-pawn-2`) as Piece

      const gameWithSelectedPiece = gameObjectReducer(game, {
        type: `select`,
        piece: selectedPiece,
      })
      expect(gameWithSelectedPiece.validMoves.length).toBeGreaterThanOrEqual(1)

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      expect(result.validAttacks.length).toEqual(0)
    })

    it(`attacking a piece adds an attack history entry to gameObject.history`, () => {
      const game = generateTestGame([
        { pieceId: `white-pawn-1`, position: [1, 5] },
        { pieceId: `black-pawn-2`, position: [2, 4] },
      ])

      const selectedPiece = game.pieces.find(
        p => p.id === `white-pawn-1`
      ) as Piece
      const enemyPiece = game.pieces.find(p => p.id === `black-pawn-2`) as Piece

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      expect(result.history.length).toEqual(1)
      const attackHistoryEvent = result.history[0] as AttackHistoryEvent

      expect(attackHistoryEvent.action).toEqual(`attack`)
      expect(attackHistoryEvent.currentPosition).toEqual(selectedPiece.position)
      expect(attackHistoryEvent.pieceId).toEqual(selectedPiece.id)
      expect(attackHistoryEvent.targetPosition).toEqual(enemyPiece.position)
      expect(attackHistoryEvent.targetPieceId).toEqual(enemyPiece.id)
    })

    it(`on successful attack, the selected piece takes the enemy piece's position `, () => {
      const game = generateTestGame([
        { pieceId: `white-pawn-1`, position: [1, 5] },
        { pieceId: `black-pawn-2`, position: [2, 4] },
      ])

      const selectedPiece = game.pieces.find(
        p => p.id === `white-pawn-1`
      ) as Piece
      const enemyPiece = game.pieces.find(p => p.id === `black-pawn-2`) as Piece

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      const updatedSelectedPiece = result.pieces.find(
        p => p.id === `white-pawn-1`
      )

      expect(updatedSelectedPiece?.position).toEqual(enemyPiece.position)
    })

    it(`if white takes the black king, the game is set to whiteWin`, () => {
      const game = generateTestGame([
        { pieceId: `white-pawn-1`, position: [1, 5] },
        { pieceId: `black-king-1`, position: [2, 4] },
      ])

      const selectedPiece = game.pieces.find(
        p => p.id === `white-pawn-1`
      ) as Piece
      const enemyPiece = game.pieces.find(p => p.id === `black-king-1`) as Piece

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      expect(result.status).toEqual(`whiteWon`)
    })

    it(`if black takes the white king, the game is set to blackWin`, () => {
      const game = generateTestGame([
        { pieceId: `black-pawn-1`, position: [5, 4] },
        { pieceId: `white-king-1`, position: [4, 5] },
      ])

      game.playerTurn = `black`

      const selectedPiece = game.pieces.find(
        p => p.id === `black-pawn-1`
      ) as Piece
      const enemyPiece = game.pieces.find(p => p.id === `white-king-1`) as Piece

      const result = gameObjectReducer(game, {
        type: `attack`,
        piece: selectedPiece,
        enemyPiece,
      })

      expect(result.status).toEqual(`blackWon`)
    })

    it.todo(`promotes the piece to a queen if moving to the opposite side of the board and selected piece is a pawn`)
  })
})