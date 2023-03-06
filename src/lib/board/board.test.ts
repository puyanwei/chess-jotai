import { generateBoard, resolveGridPositionClassNameFromBoardPosition } from '.'

describe(`generate board`, () => {
  it(`generates rows in the correct order`, () => {
    const rows = generateBoard()
    expect(rows[0].every(cell => cell.position[1] === 1)).toBe(true)
    expect(rows[1].every(cell => cell.position[1] === 2)).toBe(true)
    expect(rows[2].every(cell => cell.position[1] === 3)).toBe(true)
    expect(rows[3].every(cell => cell.position[1] === 4)).toBe(true)
    expect(rows[4].every(cell => cell.position[1] === 5)).toBe(true)
    expect(rows[5].every(cell => cell.position[1] === 6)).toBe(true)
    expect(rows[6].every(cell => cell.position[1] === 7)).toBe(true)
    expect(rows[7].every(cell => cell.position[1] === 8)).toBe(true)
    expect(rows[0].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
    expect(rows[1].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
    expect(rows[2].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
    expect(rows[3].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
    expect(rows[4].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
    expect(rows[5].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
    expect(rows[6].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
    expect(rows[7].every((cell, index) => cell.position[0] === index + 1)).toBe(
      true
    )
  })
})

describe(`resolveGridPositionClassNameFromBoardPosition`, () => {
  const resultA = resolveGridPositionClassNameFromBoardPosition([1, 1])
  expect(resultA).toEqual(`row-start-1 col-start-1`)

  const resultB = resolveGridPositionClassNameFromBoardPosition([2, 3])
  expect(resultB).toEqual(`row-start-3 col-start-2`)

  const resultC = resolveGridPositionClassNameFromBoardPosition([7, 7])
  expect(resultC).toEqual(`row-start-7 col-start-7`)
})
