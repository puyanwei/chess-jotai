import { render, screen } from '@testing-library/react'
import { generateGameObject } from 'src/lib/game'
import { GameObjectProvider } from 'src/stores/GameObjectStore'
import { PieceGraveyard } from './PieceGraveyard'
import { pieceGraveyardMockProps } from './PieceGraveyard.mockProps'

describe(`PieceGraveyard`, () => {
  it(`renders the root`, () => {
    render(
      <GameObjectProvider initialGameObject={generateGameObject()}>
        <PieceGraveyard {...pieceGraveyardMockProps} />
      </GameObjectProvider>
    )
    expect(screen.getByTestId(`piece-graveyard`)).toBeVisible()
  })
})
