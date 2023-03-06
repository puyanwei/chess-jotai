import { switchPlayer } from 'src/utils/switchPlayer'

describe(`switchPlayer`, () => {
  it(`switches player from white to black`, () => {
    expect(switchPlayer(`white`)).toEqual(`black`)
  })

  it(`switches player from black to white`, () => {
    expect(switchPlayer(`black`)).toEqual(`white`)
  })
})
