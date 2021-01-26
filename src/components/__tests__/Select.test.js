import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '../Select.jsx'

test('Select basic', () => {
  const result = render(<Select />)
  expect(result.container.querySelector('select')).toBeInTheDocument()
  expect(result.container.querySelector('select')).toBeEnabled()
  expect(result.container.querySelector('.btn-info')).not.toBeInTheDocument()
})

test('Select autoComplete', () => {
  const result = render(<Select autoComplete='name' />)
  expect(result.container.querySelector('select')).toHaveAttribute(
    'autoComplete',
    'name'
  )
})

test('Select disabled', () => {
  const result = render(<Select disabled />)
  expect(result.container.querySelector('select')).toBeDisabled()
})

test('Select info', async () => {
  const result = render(<Select info='contextual information' />)
  userEvent.click(result.container.querySelector('.btn-info'))
  await waitFor(() =>
    expect(result.getByText('contextual information')).toBeInTheDocument()
  )
  expect(result.getByText('contextual information')).toBeVisible()
  expect(result.getByText('contextual information')).toHaveClass('alert-info')
})

test('Select infoBtnContents', () => {
  const result = render(
    <Select info='contextual information' infoBtnContents='What is this?' />
  )
  expect(result.getByText('What is this?')).toBeInTheDocument()
  expect(result.getByText('What is this?')).toBeVisible()
  expect(result.getByText('What is this?')).toHaveClass('btn-info')
})

test('Select label', () => {
  const result = render(<Select label='Fooey' />)
  expect(result.getByText('Fooey')).toBeInTheDocument()
  expect(result.getByLabelText('Fooey')).toHaveClass('form-control')
})

test('Select multiple', () => {
  const result = render(<Select multiple />)
  expect(result.container.querySelector('select')).toHaveAttribute('multiple')
})

test('Select name', () => {
  const result = render(<Select name='FooBar' />)
  expect(result.container.querySelector('select')).toHaveAttribute(
    'name',
    'FooBar'
  )
})

test('Select onBlur', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onBlur={func} />)
  userEvent.tab()
  await waitFor(() => expect(x).toBe(null))
  userEvent.tab()
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onChange', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(
    <Select onChange={func}>
      <option></option>
      <option>foo</option>
      <option>bar</option>
    </Select>
  )
  userEvent.selectOptions(result.container.querySelector('select'), 'foo')
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onClick={func} />)
  userEvent.click(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onContextMenu', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onContextMenu={func} />)
  fireEvent.contextMenu(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDoubleClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDoubleClick={func} />)
  userEvent.dblClick(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDrag', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDrag={func} />)
  fireEvent.drag(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDragEnd', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDragEnd={func} />)
  fireEvent.dragEnd(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDragEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDragEnter={func} />)
  fireEvent.dragEnter(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDragLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDragLeave={func} />)
  fireEvent.dragLeave(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDragOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDragOver={func} />)
  fireEvent.dragOver(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDragStart', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDragStart={func} />)
  fireEvent.dragStart(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onDrop', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onDrop={func} />)
  fireEvent.drop(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onFocus', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onFocus={func} />)
  userEvent.tab()
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onKeyDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onKeyDown={func} />)
  userEvent.type(result.container.querySelector('select'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onKeyPress', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onKeyPress={func} />)
  userEvent.type(result.container.querySelector('select'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onKeyUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onKeyUp={func} />)
  userEvent.type(result.container.querySelector('select'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onMouseDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onMouseDown={func} />)
  userEvent.click(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onMouseEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onMouseEnter={func} />)
  fireEvent.mouseEnter(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onMouseLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onMouseLeave={func} />)
  fireEvent.mouseLeave(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onMouseMove', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onMouseMove={func} />)
  fireEvent.mouseMove(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onMouseOut', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onMouseOut={func} />)
  fireEvent.mouseOut(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onMouseOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onMouseOver={func} />)
  fireEvent.mouseOver(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onMouseUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Select onMouseUp={func} />)
  fireEvent.mouseUp(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select onSubmit', async () => {
  let x = null
  const func = event => {
    event.preventDefault()
    x = event.target
  }
  const result = render(
    <form>
      <Select onSubmit={func} />
    </form>
  )
  fireEvent.submit(result.container.querySelector('select'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('select')))
})

test('Select readOnly', async () => {
  let x = 'x'
  const setX = value => {
    x = value
  }
  const result = render(<Select value={x} valueHandler={setX} readOnly />)
  userEvent.type(result.container.querySelector('select'), 'y')
  await waitFor(() => expect(x).toBe('x'))
})

test('Select required', async () => {
  let value = ''
  const setValue = val => {
    value = val
  }
  const result = render(
    <Select required value={value} valueHandler={setValue}>
      <option></option>
      <option>foo</option>
    </Select>
  )
  expect(result.container.querySelector('select')).toHaveAttribute('required')
})

test('Select tabIndex', async () => {
  let x = 0
  const x1 = () => (x = 1)
  const x2 = () => (x = 2)
  const xNull = () => (x = null)
  render(
    <div>
      <Select tabIndex='2' onFocus={x2} />
      <Select tabIndex='-1' onFocus={xNull} />
      <Select tabIndex='1' onFocus={x1} />
    </div>
  )
  userEvent.tab()
  await waitFor(() => expect(x).toBe(1))
  userEvent.tab()
  await waitFor(() => expect(x).toBe(2))
})

test('Select validator', async () => {
  const errMsg = 'This is required!'
  const errClass = 'invalid-tooltip'
  const func = value => {
    return value !== 'foobar' ? '' : errMsg
  }
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(
    <Select validator={func} valueHandler={setX} value={x}>
      <option></option>
      <option>foo</option>
      <option>foobar</option>
    </Select>
  )
  const rerender = () => {
    result.rerender(
      <Select validator={func} valueHandler={setX} value={x}>
        <option></option>
        <option>foo</option>
        <option>foobar</option>
      </Select>
    )
  }

  userEvent.selectOptions(result.container.querySelector('select'), 'foo')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('select').checkValidity()).toBe(true)

  userEvent.selectOptions(result.container.querySelector('select'), 'foobar')
  rerender()
  await waitFor(() => expect(x).toBe('foobar'))
  expect(result.getByText(errMsg)).toHaveClass(errClass)
  expect(result.container.querySelector('.' + errClass)).toBeInTheDocument()
  expect(result.container.querySelector('.' + errClass)).toBeVisible()
  expect(result.container.querySelector('select').checkValidity()).toBe(false)
})

test('Select value', () => {
  const result = render(
    <Select label='Rock me like a...' value='wagon wheel'>
      <option></option>
      <option>baby</option>
      <option>mineral</option>
      <option>wagon wheel</option>
    </Select>
  )
  expect(result.container.querySelector('select').value).toBe('wagon wheel')
})

test('Select valueHandler: single', async () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(
    <Select valueHandler={setX} value={x}>
      <option></option>
      <option>foo</option>
      <option>bar</option>
    </Select>
  )
  const rerender = () => {
    result.rerender(
      <Select valueHandler={setX} value={x}>
        <option></option>
        <option>foo</option>
        <option>bar</option>
      </Select>
    )
  }

  userEvent.selectOptions(result.container.querySelector('select'), 'foo')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))

  userEvent.selectOptions(result.container.querySelector('select'), 'bar')
  rerender()
  await waitFor(() => expect(x).toBe('bar'))
})
