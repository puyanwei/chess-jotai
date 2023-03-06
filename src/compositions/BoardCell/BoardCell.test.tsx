import { render, screen } from '@testing-library/react'
import { BoardCell } from './BoardCell'

describe(`BoardCell`, () => {
  it(`renders the root`, () => {
    render(<BoardCell cellTheme="even" cell={{ position: [1, 1] }} />)
    expect(screen.getByTestId(`board-cell`)).toBeVisible()
  })

  it(`is marked as highlighted when isHighlighted prop is passed`, () => {
    render(
      <BoardCell cellTheme="even" cell={{ position: [1, 1] }} isHighlighted />
    )
    expect(screen.getByTestId(`board-cell`)).toHaveAttribute(
      `data-is-highlighted`
    )
  })

  it(`is not marked as highlighted when isHighlighted prop is NOT provided`, () => {
    render(<BoardCell cellTheme="even" cell={{ position: [1, 1] }} />)
    expect(screen.getByTestId(`board-cell`)).not.toHaveAttribute(
      `data-is-highlighted`
    )
  })
})
