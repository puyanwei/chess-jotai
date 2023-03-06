import { Board } from '@/views/Board'
import { GameObject } from '@/types'
import { generateGameObject } from 'src/lib/game'

const initialGameObject: GameObject = generateGameObject()

function Home() {
  return <Board initialGameObject={initialGameObject} />
}

export default Home
