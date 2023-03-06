import { GameObject } from '@/types'
import { Board } from '@/views/Board'

import { generateGameObject } from 'src/lib/game'

const initialGameObject: GameObject = generateGameObject()

function Home() {
  return <Board initialGameObject={initialGameObject} />
}

export default Home
