import { render, screen } from '@testing-library/react'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { generateGameObject } from 'src/lib/game'
import { Board } from './Board'

describe(`Board`, () => {
  const gameObject = generateGameObject()

  it(`renders the root`, () => {
    render(<Board initialGameObject={gameObject} />)
    expect(screen.getByTestId(`board`)).toBeVisible()
  })

  it(`renders the underlay`, () => {
    render(<Board initialGameObject={gameObject} />)
    expect(screen.getByTestId(`board-underlay`)).toBeVisible()
  })

  it(`renders the pieces`, () => {
    render(<Board initialGameObject={gameObject} />)
    expect(screen.getByTestId(`board-pieces`)).toBeVisible()
  })

  it(`renders out 64 board cells`, () => {
    render(<Board initialGameObject={gameObject} />)
    expect(screen.getAllByTestId(`board-cell`).length).toEqual(64)
  })

  it(`places all board pieces in their correct positions`, () => {
    expect.assertions(gameObject.pieces.length)

    render(<Board initialGameObject={gameObject} />)

    gameObject.pieces.forEach(piece => {
      const piecePositionClassName =
        resolveGridPositionClassNameFromBoardPosition(piece.position)

      const pieceElem = document.getElementById(`piece-${piece.id}`)
      expect(pieceElem).toHaveClass(piecePositionClassName)
    })
  })

  it(`highlight each cell that corresponds to a valid move on the game object`, () => {
    const gameObject = generateGameObject({
      validMoves: [
        [1, 1],
        [5, 4],
      ],
    })
    render(<Board initialGameObject={gameObject} />)
    expect(document.getElementById(`board-cell-11`)).toHaveAttribute(
      `data-is-highlighted`
    )
    expect(document.getElementById(`board-cell-54`)).toHaveAttribute(
      `data-is-highlighted`
    )
  })
})
