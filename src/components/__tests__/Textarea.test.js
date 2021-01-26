import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '../Textarea.jsx'

test('Textarea basic', () => {
  const result = render(<Textarea />)
  expect(result.container.querySelector('textarea')).toBeInTheDocument()
  expect(result.container.querySelector('textarea')).toBeEnabled()
  expect(result.container.querySelector('.btn-info')).not.toBeInTheDocument()
})

test('Textarea autoComplete', () => {
  const result = render(<Textarea autoComplete='on' />)
  expect(result.container.querySelector('textarea')).toHaveAttribute(
    'autoComplete',
    'on'
  )
})

test('Textarea disabled', () => {
  const result = render(<Textarea disabled />)
  expect(result.container.querySelector('textarea')).toBeDisabled()
})

test('Textarea info', async () => {
  const result = render(<Textarea info='contextual information' />)
  userEvent.click(result.container.querySelector('.btn-info'))
  await waitFor(() =>
    expect(result.getByText('contextual information')).toBeInTheDocument()
  )
  expect(result.getByText('contextual information')).toBeVisible()
  expect(result.getByText('contextual information')).toHaveClass('alert-info')
})

test('Textarea infoBtnContents', () => {
  const result = render(
    <Textarea info='contextual information' infoBtnContents='What is this?' />
  )
  expect(result.getByText('What is this?')).toBeInTheDocument()
  expect(result.getByText('What is this?')).toBeVisible()
  expect(result.getByText('What is this?')).toHaveClass('btn-info')
})

test('Textarea label', () => {
  const result = render(<Textarea label='Fooey' />)
  expect(result.getByText('Fooey')).toBeInTheDocument()
  expect(result.getByLabelText('Fooey')).toHaveClass('form-control')
})

test('Textarea maxLength', async () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(
    <Textarea value={x} valueHandler={setX} maxLength='3' />
  )
  const rerender = () => {
    result.rerender(<Textarea value={x} valueHandler={setX} maxLength='3' />)
  }

  userEvent.type(result.container.querySelector('textarea'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('f'))

  userEvent.type(result.container.querySelector('textarea'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('fo'))

  userEvent.type(result.container.querySelector('textarea'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))

  userEvent.type(result.container.querySelector('textarea'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))
})

test('Textarea minLength', () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(
    <Textarea value={x} valueHandler={setX} minLength='3' required />
  )
  expect(result.container.querySelector('textarea')).toHaveAttribute(
    'minLength',
    '3'
  )
})

test('Textarea name', () => {
  const result = render(<Textarea name='FooBar' />)
  expect(result.container.querySelector('textarea')).toHaveAttribute(
    'name',
    'FooBar'
  )
})

test('Textarea onBlur', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onBlur={func} />)
  userEvent.tab()
  await waitFor(() => expect(x).toBe(null))
  userEvent.tab()
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onChange', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onChange={func} />)
  userEvent.type(result.container.querySelector('textarea'), 'test')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onClick={func} />)
  userEvent.click(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onContextMenu', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onContextMenu={func} />)
  fireEvent.contextMenu(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDoubleClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDoubleClick={func} />)
  userEvent.dblClick(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDrag', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDrag={func} />)
  fireEvent.drag(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDragEnd', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDragEnd={func} />)
  fireEvent.dragEnd(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDragEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDragEnter={func} />)
  fireEvent.dragEnter(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDragLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDragLeave={func} />)
  fireEvent.dragLeave(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDragOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDragOver={func} />)
  fireEvent.dragOver(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDragStart', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDragStart={func} />)
  fireEvent.dragStart(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onDrop', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onDrop={func} />)
  fireEvent.drop(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onFocus', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onFocus={func} />)
  userEvent.tab()
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onInput', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onInput={func} />)
  userEvent.type(result.container.querySelector('textarea'), 'test')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onKeyDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onKeyDown={func} />)
  userEvent.type(result.container.querySelector('textarea'), '{enter}')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onKeyPress', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onKeyPress={func} />)
  userEvent.type(result.container.querySelector('textarea'), '{enter}')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onKeyUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onKeyUp={func} />)
  userEvent.type(result.container.querySelector('textarea'), '{enter}')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onMouseDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onMouseDown={func} />)
  userEvent.click(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onMouseEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onMouseEnter={func} />)
  fireEvent.mouseEnter(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onMouseLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onMouseLeave={func} />)
  fireEvent.mouseLeave(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onMouseMove', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onMouseMove={func} />)
  fireEvent.mouseMove(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onMouseOut', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onMouseOut={func} />)
  fireEvent.mouseOut(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onMouseOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onMouseOver={func} />)
  fireEvent.mouseOver(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onMouseUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onMouseUp={func} />)
  fireEvent.mouseUp(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onSelect', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Textarea onSelect={func} value='foo' />)
  userEvent.type(result.container.querySelector('textarea'), '{selectall}')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea onSubmit', async () => {
  let x = null
  const func = event => {
    event.preventDefault()
    x = event.target
  }
  const result = render(
    <form>
      <Textarea onSubmit={func} />
    </form>
  )
  fireEvent.submit(result.container.querySelector('textarea'))
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('textarea'))
  )
})

test('Textarea placeholder', () => {
  const result = render(<Textarea placeholder='enter some text' />)
  expect(result.container.querySelector('textarea')).toHaveAttribute(
    'placeholder',
    'enter some text'
  )
})

test('Textarea readOnly', async () => {
  let x = 'x'
  const setX = value => {
    x = value
  }
  const result = render(<Textarea value={x} valueHandler={setX} readOnly />)
  userEvent.type(result.container.querySelector('textarea'), 'y')
  await waitFor(() => expect(x).toBe('x'))
})

test('Textarea required', async () => {
  let x = false
  const func = event => {
    event.preventDefault()
    x = event.target.checkValidity()
  }
  const result = render(
    <form onSubmit={func}>
      <Textarea required />
    </form>
  )
  fireEvent.submit(result.container.querySelector('form'))
  await waitFor(() => expect(x).toBe(false))
  userEvent.type(result.container.querySelector('textarea'), 'test')
  fireEvent.submit(result.container.querySelector('form'))
  await waitFor(() => expect(x).toBe(true))
})

test('Textarea spellCheck', () => {
  const result = render(<Textarea spellCheck='true' />)
  expect(result.container.querySelector('textarea')).toHaveAttribute(
    'spellCheck',
    'true'
  )
})

test('Textarea tabIndex', async () => {
  let x = 0
  const x1 = () => (x = 1)
  const x2 = () => (x = 2)
  const xNull = () => (x = null)
  render(
    <div>
      <Textarea tabIndex='2' onFocus={x2} />
      <Textarea tabIndex='-1' onFocus={xNull} />
      <Textarea tabIndex='1' onFocus={x1} />
    </div>
  )
  userEvent.tab()
  await waitFor(() => expect(x).toBe(1))
  userEvent.tab()
  await waitFor(() => expect(x).toBe(2))
})

test('Textarea type', () => {
  const supportedTypes = [
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week'
  ]
  const result = render(<Textarea />)
  for (let type of supportedTypes) {
    result.rerender(<Textarea type={type} />)
    expect(result.container.querySelector('textarea')).toBeInTheDocument()
    expect(result.container.querySelector('textarea')).toBeVisible()
  }
})

test('Textarea validator', async () => {
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
    <Textarea validator={func} valueHandler={setX} value={x} />
  )
  const rerender = () => {
    result.rerender(<Textarea validator={func} valueHandler={setX} value={x} />)
  }

  userEvent.type(result.container.querySelector('textarea'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('f'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('textarea').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('textarea'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('fo'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('textarea').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('textarea'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('textarea').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('textarea'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('foob'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('textarea').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('textarea'), 'a')
  rerender()
  await waitFor(() => expect(x).toBe('fooba'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('textarea').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('textarea'), 'r')
  rerender()
  await waitFor(() => expect(x).toBe('foobar'))
  result.rerender(<Textarea valueHandler={setX} value={x} validator={func} />)
  expect(result.getByText(errMsg)).toHaveClass(errClass)
  expect(result.container.querySelector('.' + errClass)).toBeInTheDocument()
  expect(result.container.querySelector('.' + errClass)).toBeVisible()
  expect(result.container.querySelector('textarea').checkValidity()).toBe(false)
})

test('Textarea value', () => {
  const result = render(<Textarea value='wagon wheel' />)
  expect(result.container.querySelector('textarea').value).toBe('wagon wheel')
})

test('Textarea valueHandler', async () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(<Textarea valueHandler={setX} value={x} />)
  const rerender = () => {
    result.rerender(<Textarea valueHandler={setX} value={x} />)
  }

  userEvent.type(result.container.querySelector('textarea'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('f'))

  userEvent.type(result.container.querySelector('textarea'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('fo'))

  userEvent.type(result.container.querySelector('textarea'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))

  userEvent.type(result.container.querySelector('textarea'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('foob'))

  userEvent.type(result.container.querySelector('textarea'), 'a')
  rerender()
  await waitFor(() => expect(x).toBe('fooba'))

  userEvent.type(result.container.querySelector('textarea'), 'r')
  rerender()
  await waitFor(() => expect(x).toBe('foobar'))
})

test('Textarea wrap', () => {
  const result = render(<Textarea wrap='hard' />)
  expect(result.container.querySelector('textarea')).toHaveAttribute(
    'wrap',
    'hard'
  )
})
