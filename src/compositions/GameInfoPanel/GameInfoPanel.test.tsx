import { render, screen } from '@testing-library/react'
import { generateGameObject } from 'src/lib/game'
import { GameObjectProvider } from 'src/stores/GameObjectStore'
import { GameInfoPanel } from './GameInfoPanel'
import { gameInfoPanelMockProps } from './GameInfoPanel.mockProps'
describe(`GameInfoPanel`, () => {
  it(`renders the root`, () => {
    render(
      <GameObjectProvider initialGameObject={generateGameObject()}>
        <GameInfoPanel {...gameInfoPanelMockProps} />
      </GameObjectProvider>
    )
    expect(screen.getByTestId(`game-info-panel`)).toBeVisible()
  })
})
