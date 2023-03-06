import { Component } from '@/types'
import { useGameObject } from 'src/stores/GameObjectStore'

export interface Props extends Component {}

export function GameOverModal({
  className = ``,
  testId = `game-over-modal`,
}: Props) {
  const [game] = useGameObject()

  if (![`whiteWon`, `blackWon`].includes(game.status)) return null

  const winner = game.status === `whiteWon` ? `White` : `Black`

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="p-4">
        <div
          className={`p-8 text-white bg-black rounded-md shadow-xl top-4 left-1/2 -translate-x-1/2 ${className}`}
          data-testid={testId}
        >
          <h1 className="font-semibold">
            Game over:&nbsp;&nbsp;
            <span className="uppercase">{winner} wins</span>
          </h1>
        </div>
      </div>
    </div>
  )
}
