import { Component, GameObject } from '@/types'
import { GameObjectProvider } from 'src/stores/GameObjectStore/GameObjectStore'
import { BoardPieces } from './Board.Pieces'
import { BoardGrid } from './Board.Grid'
import { GameInfoPanel } from 'src/compositions/GameInfoPanel'
import { PieceGraveyard } from 'src/compositions/PieceGraveyard'
import { GameOverModal } from 'src/compositions/GameOverModal'

interface Props extends Component {
  initialGameObject: GameObject
}

export function Board({ initialGameObject, testId = `board` }: Props) {
  return (
    <GameObjectProvider initialGameObject={initialGameObject}>
      <GameInfoPanel className="fixed bottom-0 right-0" />
      <PieceGraveyard className="fixed top-0 right-0" />
      <div
        className="flex items-center justify-center w-full h-full min-h-screen bg-slate-200"
        data-testid={testId}
      >
        <div className="grid justify-center grid-cols-1 grid-rows-1 h-[80vh] aspect-square items-stretch">
          <BoardPieces className="z-10 col-start-1 row-start-1" />
          <BoardGrid className="col-start-1 row-start-1" />
        </div>
      </div>
      <GameOverModal className="fixed top-0" />
    </GameObjectProvider>
  )
}
