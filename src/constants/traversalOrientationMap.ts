import { OrienationMap } from '@/types'

export const traversalOrientationMap: OrienationMap = {
  up: [0, -1],
  'up-right': [1, -1],
  right: [1, 0],
  'down-right': [1, 1],
  down: [0, 1],
  'down-left': [-1, 1],
  left: [-1, 0],
  'up-left': [-1, -1],
}
