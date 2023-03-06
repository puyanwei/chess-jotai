import { generateGameObject } from '.'

describe(`generateGameObject`, () => {
  it(`returns a game object`, () => {
    const gameObject = generateGameObject()
    expect(gameObject).toBeTruthy()
  })

  it(`game object status is set to ready`, () => {
    const gameObject = generateGameObject()
    expect(gameObject.status).toEqual(`ready`)
  })

  it(`game object playerTurn is initially set to white`, () => {
    const gameObject = generateGameObject()
    expect(gameObject.playerTurn).toEqual(`white`)
  })

  it(`game object has a pieces array`, () => {
    const gameObject = generateGameObject()
    expect(Array.isArray(gameObject.pieces)).toBe(true)
  })

  it(`game object has a history array`, () => {
    const gameObject = generateGameObject()
    expect(Array.isArray(gameObject.history)).toBe(true)
  })
})
