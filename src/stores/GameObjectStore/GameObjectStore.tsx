import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { Component, GameObject } from '@/types'
import { gameObjectReducer, ReducerAction } from './GameObject.reducer'

interface Props extends Component {
  initialGameObject: GameObject
}

type GameObjectContextType = [GameObject, Dispatch<ReducerAction>]

const GameObjectContext = createContext<GameObjectContextType | null>(null)

export function GameObjectProvider({ initialGameObject, children }: Props) {
  const [gameObject, dispatch] = useReducer(
    gameObjectReducer,
    initialGameObject
  )

  return (
    <GameObjectContext.Provider value={[gameObject, dispatch]}>
      {children}
    </GameObjectContext.Provider>
  )
}

export function useGameObject() {
  return useContext(GameObjectContext) as GameObjectContextType
}
