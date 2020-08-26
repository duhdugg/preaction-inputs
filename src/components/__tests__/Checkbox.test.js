/* global test, expect */
import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../Checkbox.jsx'

test('Checkbox basic', () => {
  const result = render(<Checkbox />)
  expect(result.container.querySelector('input')).toBeInTheDocument()
  expect(result.container.querySelector('input')).toHaveAttribute(
    'type',
    'checkbox'
  )
  expect(result.container.querySelector('input')).not.toHaveAttribute('checked')
  expect(result.container.querySelector('input')).toBeEnabled()
})

test('Checkbox checked', () => {
  const result = render(<Checkbox checked />)
  expect(result.container.querySelector('input')).toHaveAttribute('checked')
})

test('Checkbox disabled', () => {
  const result = render(<Checkbox disabled />)
  expect(result.container.querySelector('input')).toBeDisabled()
})

test('Checkbox label', () => {
  const result = render(<Checkbox label='Fooey' />)
  expect(result.getByText('Fooey')).toBeInTheDocument()
  expect(result.getByLabelText('Fooey')).toHaveClass('form-check-input')
})

test('Checkbox name', () => {
  const result = render(<Checkbox name='FooBar' />)
  expect(result.container.querySelector('input')).toHaveAttribute(
    'name',
    'FooBar'
  )
})

test('Checkbox onBlur', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onBlur={func} />)
  userEvent.tab()
  await waitFor(() => expect(x).toBe(null))
  userEvent.tab()
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onChange', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onChange={func} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onClick={func} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onContextMenu', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onContextMenu={func} />)
  fireEvent.contextMenu(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDoubleClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDoubleClick={func} />)
  userEvent.dblClick(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDrag', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDrag={func} />)
  fireEvent.drag(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDragEnd', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDragEnd={func} />)
  fireEvent.dragEnd(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDragEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDragEnter={func} />)
  fireEvent.dragEnter(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDragLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDragLeave={func} />)
  fireEvent.dragLeave(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDragOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDragOver={func} />)
  fireEvent.dragOver(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDragStart', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDragStart={func} />)
  fireEvent.dragStart(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onDrop', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onDrop={func} />)
  fireEvent.drop(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onFocus', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onFocus={func} />)
  userEvent.tab()
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onInput', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onInput={func} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onKeyDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onKeyDown={func} />)
  userEvent.type(result.container.querySelector('input'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onKeyPress', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onKeyPress={func} />)
  userEvent.type(result.container.querySelector('input'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onKeyUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onKeyUp={func} />)
  userEvent.type(result.container.querySelector('input'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onMouseDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onMouseDown={func} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onMouseEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onMouseEnter={func} />)
  fireEvent.mouseEnter(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onMouseLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onMouseLeave={func} />)
  fireEvent.mouseLeave(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onMouseMove', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onMouseMove={func} />)
  fireEvent.mouseMove(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onMouseOut', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onMouseOut={func} />)
  fireEvent.mouseOut(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onMouseOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onMouseOver={func} />)
  fireEvent.mouseOver(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onMouseUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Checkbox onMouseUp={func} />)
  fireEvent.mouseUp(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox onSubmit', async () => {
  let x = null
  const func = event => {
    event.preventDefault()
    x = event.target
  }
  const result = render(
    <form>
      <Checkbox onSubmit={func} />
    </form>
  )
  fireEvent.submit(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Checkbox required', async () => {
  let x = false
  const func = event => {
    event.preventDefault()
    x = event.target.checkValidity()
  }
  const result = render(
    <form onSubmit={func}>
      <Checkbox required />
    </form>
  )
  fireEvent.submit(result.container.querySelector('form'))
  await waitFor(() => expect(x).toBe(false))
  userEvent.click(result.container.querySelector('input'))
  fireEvent.submit(result.container.querySelector('form'))
  await waitFor(() => expect(x).toBe(true))
})

test('Checkbox tabIndex', async () => {
  let x = 0
  const x1 = () => (x = 1)
  const x2 = () => (x = 2)
  const xNull = () => (x = null)
  render(
    <div>
      <Checkbox tabIndex='2' onFocus={x2} />
      <Checkbox tabIndex='-1' onFocus={xNull} />
      <Checkbox tabIndex='1' onFocus={x1} />
    </div>
  )
  userEvent.tab()
  await waitFor(() => expect(x).toBe(1))
  userEvent.tab()
  await waitFor(() => expect(x).toBe(2))
})

test('Checkbox validator', async () => {
  const errMsg = 'This is required!'
  const errClass = 'invalid-tooltip'
  const func = value => {
    return !!value ? '' : errMsg
  }
  let x = false
  const setX = value => {
    x = value
  }
  const result = render(
    <Checkbox validator={func} valueHandler={setX} checked={x} />
  )
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(true))
  result.rerender(<Checkbox valueHandler={setX} checked={x} validator={func} />)
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(false))
  result.rerender(<Checkbox valueHandler={setX} checked={x} validator={func} />)
  expect(result.getByText(errMsg)).toHaveClass(errClass)
  expect(result.container.querySelector('.' + errClass)).toBeInTheDocument()
  expect(result.container.querySelector('.' + errClass)).toBeVisible()
})

test('Checkbox valueHandler', async () => {
  let x = false
  const setX = value => {
    x = value
  }
  const result = render(<Checkbox valueHandler={setX} checked={x} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(true))
  result.rerender(<Checkbox valueHandler={setX} checked={x} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(false))
})
