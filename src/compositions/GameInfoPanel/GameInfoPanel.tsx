import { Component } from '@/types'
import { useEffect } from 'react'
import { useGameObject } from 'src/stores/GameObjectStore'

export interface Props extends Component {}

export function GameInfoPanel({
  className = ``,
  testId = `game-info-panel`,
}: Props) {
  const [game] = useGameObject()

  // useEffect(() => {
  //   console.log(game)
  // }, [game])

  return (
    <div className={`p-8 bg-white shadow-xl ${className}`} data-testid={testId}>
      <div className="flex gap-1 font-mono">
        <div className="font-bold">Player turn:</div>
        <div className="">{game.playerTurn}</div>
      </div>
    </div>
  )
}
