import { render, screen } from '@testing-library/react'
import { generateGameObject } from 'src/lib/game'
import { GameObjectProvider } from 'src/stores/GameObjectStore'
import { GameOverModal } from './GameOverModal'
import { gameOverModalMockProps } from './GameOverModal.mockProps'

describe(`GameOverModal`, () => {
  it(`renders the root`, () => {
    render(
      <GameObjectProvider
        initialGameObject={generateGameObject({ status: `whiteWon` })}
      >
        <GameOverModal {...gameOverModalMockProps} />
      </GameObjectProvider>
    )
    expect(screen.getByTestId(`game-over-modal`)).toBeVisible()
  })
})
