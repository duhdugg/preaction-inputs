import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input.jsx'

test('Input basic', () => {
  const result = render(<Input />)
  expect(result.container.querySelector('input')).toBeInTheDocument()
  expect(result.container.querySelector('input')).toHaveAttribute(
    'type',
    'text'
  )
  expect(result.container.querySelector('input')).toBeEnabled()
  expect(result.container.querySelector('.btn-info')).not.toBeInTheDocument()
})

test('Input autoComplete', () => {
  const result = render(<Input autoComplete='name' />)
  expect(result.container.querySelector('input')).toHaveAttribute(
    'autoComplete',
    'name'
  )
})

test('Input disabled', () => {
  const result = render(<Input disabled />)
  expect(result.container.querySelector('input')).toBeDisabled()
})

test('Input info', async () => {
  const result = render(<Input info='contextual information' />)
  userEvent.click(result.container.querySelector('.btn-info'))
  await waitFor(() =>
    expect(result.getByText('contextual information')).toBeInTheDocument()
  )
  expect(result.getByText('contextual information')).toBeVisible()
  expect(result.getByText('contextual information')).toHaveClass('alert-info')
})

test('Input infoBtnContents', () => {
  const result = render(
    <Input info='contextual information' infoBtnContents='What is this?' />
  )
  expect(result.getByText('What is this?')).toBeInTheDocument()
  expect(result.getByText('What is this?')).toBeVisible()
  expect(result.getByText('What is this?')).toHaveClass('btn-info')
})

test('Input inputMode', () => {
  const result = render(<Input inputMode='search' />)
  expect(result.container.querySelector('input')).toHaveAttribute(
    'inputmode',
    'search'
  )
})

test('Input inputMode defaults based on type', () => {
  const matchTypes = ['email', 'number', 'tel', 'url', 'text']
  for (let type of matchTypes) {
    let result = render(<Input type={type} />)
    expect(result.container.querySelector('input')).toHaveAttribute(
      'inputMode',
      type.replace(/number/, 'numeric')
    )
  }
  const textTypes = [
    'color',
    'date',
    'datetime-local',
    'month',
    'password',
    'range',
    'search',
    'time',
    'week'
  ]
  for (let type of textTypes) {
    let result = render(<Input type={type} />)
    expect(result.container.querySelector('input')).toHaveAttribute(
      'inputMode',
      'text'
    )
  }
})

test('Input label', () => {
  const result = render(<Input label='Fooey' />)
  expect(result.getByText('Fooey')).toBeInTheDocument()
  expect(result.getByLabelText('Fooey')).toHaveClass('form-control')
})

test('Input max', async () => {
  let x = 0
  const setX = value => {
    x = value
  }
  const result = render(
    <Input type='number' value={x} valueHandler={setX} max='3' />
  )
  const rerender = () => {
    result.rerender(
      <Input type='number' value={x} valueHandler={setX} max='3' />
    )
  }
  userEvent.type(result.container.querySelector('input'), '4')
  rerender()
  await waitFor(() =>
    expect(result.container.querySelector('input').checkValidity()).toBe(false)
  )
})

test('Input maxLength', async () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(<Input value={x} valueHandler={setX} maxLength='3' />)
  const rerender = () => {
    result.rerender(<Input value={x} valueHandler={setX} maxLength='3' />)
  }

  userEvent.type(result.container.querySelector('input'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('f'))

  userEvent.type(result.container.querySelector('input'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('fo'))

  userEvent.type(result.container.querySelector('input'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))

  userEvent.type(result.container.querySelector('input'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))
})

test('Input min', async () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(
    <Input type='number' value={x} valueHandler={setX} min='1' />
  )
  const rerender = () => {
    result.rerender(
      <Input type='number' value={x} valueHandler={setX} min='1' />
    )
  }
  userEvent.type(result.container.querySelector('input'), '0')
  rerender()
  await waitFor(() =>
    expect(result.container.querySelector('input').checkValidity()).toBe(false)
  )
})

test('Input minLength', () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(
    <Input value={x} valueHandler={setX} minLength='3' required />
  )
  expect(result.container.querySelector('input')).toHaveAttribute(
    'minLength',
    '3'
  )
})

test('Input multiple', () => {
  const result = render(
    <Input type='email' value='test1@example.com,test2@example.com' />
  )
  expect(result.container.querySelector('input').checkValidity()).toBe(false)
  result.rerender(
    <Input type='email' value='test1@example.com,test@example.com' multiple />
  )
  expect(result.container.querySelector('input').checkValidity()).toBe(true)
})

test('Input name', () => {
  const result = render(<Input name='FooBar' />)
  expect(result.container.querySelector('input')).toHaveAttribute(
    'name',
    'FooBar'
  )
})

test('Input onBlur', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onBlur={func} />)
  userEvent.tab()
  await waitFor(() => expect(x).toBe(null))
  userEvent.tab()
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onChange', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onChange={func} />)
  userEvent.type(result.container.querySelector('input'), 'test')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onClick={func} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onContextMenu', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onContextMenu={func} />)
  fireEvent.contextMenu(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDoubleClick', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDoubleClick={func} />)
  userEvent.dblClick(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDrag', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDrag={func} />)
  fireEvent.drag(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDragEnd', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDragEnd={func} />)
  fireEvent.dragEnd(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDragEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDragEnter={func} />)
  fireEvent.dragEnter(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDragLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDragLeave={func} />)
  fireEvent.dragLeave(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDragOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDragOver={func} />)
  fireEvent.dragOver(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDragStart', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDragStart={func} />)
  fireEvent.dragStart(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onDrop', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onDrop={func} />)
  fireEvent.drop(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onFocus', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onFocus={func} />)
  userEvent.tab()
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onInput', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onInput={func} />)
  userEvent.type(result.container.querySelector('input'), 'test')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onKeyDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onKeyDown={func} />)
  userEvent.type(result.container.querySelector('input'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onKeyPress', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onKeyPress={func} />)
  userEvent.type(result.container.querySelector('input'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onKeyUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onKeyUp={func} />)
  userEvent.type(result.container.querySelector('input'), '{enter}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onMouseDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onMouseDown={func} />)
  userEvent.click(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onMouseEnter', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onMouseEnter={func} />)
  fireEvent.mouseEnter(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onMouseLeave', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onMouseLeave={func} />)
  fireEvent.mouseLeave(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onMouseMove', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onMouseMove={func} />)
  fireEvent.mouseMove(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onMouseOut', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onMouseOut={func} />)
  fireEvent.mouseOut(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onMouseOver', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onMouseOver={func} />)
  fireEvent.mouseOver(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onMouseUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onMouseUp={func} />)
  fireEvent.mouseUp(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onSelect', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Input onSelect={func} value='foo' />)
  userEvent.type(result.container.querySelector('input'), '{selectall}')
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input onSubmit', async () => {
  let x = null
  const func = event => {
    event.preventDefault()
    x = event.target
  }
  const result = render(
    <form>
      <Input onSubmit={func} />
    </form>
  )
  fireEvent.submit(result.container.querySelector('input'))
  await waitFor(() => expect(x).toBe(result.container.querySelector('input')))
})

test('Input pattern', () => {
  const result = render(<Input value='foobar' pattern='^f\d\dbar$' />)
  expect(result.container.querySelector('input').checkValidity()).toBe(false)
  result.rerender(<Input value='f00bar' pattern='^f\d\dbar$' />)
  expect(result.container.querySelector('input').checkValidity()).toBe(true)
})

test('Input placeholder', () => {
  const result = render(<Input placeholder='enter some text' />)
  expect(result.container.querySelector('input')).toHaveAttribute(
    'placeholder',
    'enter some text'
  )
})

test('Input readOnly', async () => {
  let x = 'x'
  const setX = value => {
    x = value
  }
  const result = render(<Input value={x} valueHandler={setX} readOnly />)
  userEvent.type(result.container.querySelector('input'), 'y')
  await waitFor(() => expect(x).toBe('x'))
})

test('Input required', async () => {
  let x = false
  const func = event => {
    event.preventDefault()
    x = event.target.checkValidity()
  }
  const result = render(
    <form onSubmit={func}>
      <Input required />
    </form>
  )
  fireEvent.submit(result.container.querySelector('form'))
  await waitFor(() => expect(x).toBe(false))
  userEvent.type(result.container.querySelector('input'), 'test')
  fireEvent.submit(result.container.querySelector('form'))
  await waitFor(() => expect(x).toBe(true))
})

test('Input step', () => {
  const result = render(<Input type='number' step='0.1' />)
  expect(result.container.querySelector('input')).toHaveAttribute('step', '0.1')
})

test('Input tabIndex', async () => {
  let x = 0
  const x1 = () => (x = 1)
  const x2 = () => (x = 2)
  const xNull = () => (x = null)
  render(
    <div>
      <Input tabIndex='2' onFocus={x2} />
      <Input tabIndex='-1' onFocus={xNull} />
      <Input tabIndex='1' onFocus={x1} />
    </div>
  )
  userEvent.tab()
  await waitFor(() => expect(x).toBe(1))
  userEvent.tab()
  await waitFor(() => expect(x).toBe(2))
})

test('Input type', () => {
  const supportedTypes = [
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week'
  ]
  const result = render(<Input />)
  for (let type of supportedTypes) {
    result.rerender(<Input type={type} />)
    expect(result.container.querySelector('input')).toBeInTheDocument()
    expect(result.container.querySelector('input')).toBeVisible()
    expect(result.container.querySelector('input')).toHaveAttribute(
      'type',
      type
    )
  }
})

test('Input validator', async () => {
  const errMsg = 'This is required!'
  const errClass = 'invalid-feedback'
  const func = value => {
    return value !== 'foobar' ? '' : errMsg
  }
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(
    <Input validator={func} valueHandler={setX} value={x} />
  )
  const rerender = () => {
    result.rerender(<Input validator={func} valueHandler={setX} value={x} />)
  }

  userEvent.type(result.container.querySelector('input'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('f'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('input').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('input'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('fo'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('input').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('input'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('input').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('input'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('foob'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('input').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('input'), 'a')
  rerender()
  await waitFor(() => expect(x).toBe('fooba'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(result.container.querySelector('input').checkValidity()).toBe(true)

  userEvent.type(result.container.querySelector('input'), 'r')
  rerender()
  await waitFor(() => expect(x).toBe('foobar'))
  expect(result.getByText(errMsg)).toHaveClass(errClass)
  expect(result.container.querySelector('.' + errClass)).toBeInTheDocument()
  expect(result.container.querySelector('.' + errClass)).toBeVisible()
  expect(result.container.querySelector('input').checkValidity()).toBe(false)
})

test('Input value', () => {
  const result = render(<Input value='wagon wheel' />)
  expect(result.container.querySelector('input').value).toBe('wagon wheel')
})

test('Input valueHandler', async () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(<Input valueHandler={setX} value={x} />)
  const rerender = () => {
    result.rerender(<Input valueHandler={setX} value={x} />)
  }

  userEvent.type(result.container.querySelector('input'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('f'))

  userEvent.type(result.container.querySelector('input'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('fo'))

  userEvent.type(result.container.querySelector('input'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('foo'))

  userEvent.type(result.container.querySelector('input'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('foob'))

  userEvent.type(result.container.querySelector('input'), 'a')
  rerender()
  await waitFor(() => expect(x).toBe('fooba'))

  userEvent.type(result.container.querySelector('input'), 'r')
  rerender()
  await waitFor(() => expect(x).toBe('foobar'))
})
