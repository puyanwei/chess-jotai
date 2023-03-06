import { generateGameWithSinglePiece } from './generateGameWithSinglePiece'

describe(`generateGameWithSinglePiece`, () => {
  it(`creates a board with a single piece matching the provided piece id`, () => {
    const pieceOneId = `white-king-1`
    const gameOne = generateGameWithSinglePiece(pieceOneId)
    expect(gameOne.pieces?.length).toEqual(1)
    expect(gameOne.pieces[0].id).toEqual(pieceOneId)

    const pieceTwoId = `black-bishop-1`
    const gameTwo = generateGameWithSinglePiece(pieceTwoId)
    expect(gameTwo.pieces?.length).toEqual(1)
    expect(gameTwo.pieces[0].id).toEqual(pieceTwoId)
  })
})
