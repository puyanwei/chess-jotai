import { render, screen } from '@testing-library/react'
import { generateGameObject } from 'src/lib/game'
import { GameObjectProvider } from 'src/stores/GameObjectStore'
import { Piece } from '.'

describe(`Piece`, () => {
  it(`renders when provided with a valid piece`, () => {
    const gameObject = generateGameObject()
    const piece = gameObject.pieces[0]
    render(
      <GameObjectProvider initialGameObject={gameObject}>
        <Piece piece={piece} />
      </GameObjectProvider>
    )
    expect(screen.getByTestId(`piece`)).toBeVisible()
  })

  it(`renders the correct piece label`, () => {
    const gameObject = generateGameObject()
    const piece = gameObject.pieces[0]
    render(
      <GameObjectProvider initialGameObject={gameObject}>
        <Piece piece={piece} />
      </GameObjectProvider>
    )
    expect(screen.getByText(piece.name)).toBeVisible()
  })

  it(`renders the correct piece by id`, () => {
    const gameObject = generateGameObject()
    const piece = gameObject.pieces[0]
    render(
      <GameObjectProvider initialGameObject={gameObject}>
        <Piece piece={piece} />
      </GameObjectProvider>
    )
    expect(document.getElementById(`piece-${piece.id}`)).toBeVisible()
  })
})
