import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Wysiwyg } from '../Wysiwyg.jsx'

test('Wysiwyg basic', async () => {
  const result = render(<Wysiwyg />)
  await waitFor(() =>
    expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  )
})

test('Wysiwyg allowDangerousFallback', async () => {
  const result = render(
    <Wysiwyg
      fallbackMode
      allowDangerousFallback
      value={'<div data-test="foo">bar</div>'}
    />
  )
  expect(result.getByText('bar')).toHaveAttribute('data-test', 'foo')
})

test('Wysiwyg info', async () => {
  const result = render(<Wysiwyg info='contextual information' />)
  await userEvent.click(result.container.querySelector('.btn-info'))
  expect(result.getByText('contextual information')).toBeInTheDocument()
  expect(result.getByText('contextual information')).toBeVisible()
  expect(result.getByText('contextual information')).toHaveClass('alert-info')
})

test('Wysiwyg infoBtnContents', () => {
  const result = render(
    <Wysiwyg info='contextual information' infoBtnContents='What is this?' />
  )
  expect(result.getByText('What is this?')).toBeInTheDocument()
  expect(result.getByText('What is this?')).toBeVisible()
  expect(result.getByText('What is this?')).toHaveClass('btn-info')
})

test('Wysiwyg label', () => {
  const result = render(<Wysiwyg label='Fooey' />)
  expect(result.getByText('Fooey')).toBeInTheDocument()
})

test('Wysiwyg onBlur', async () => {
  let x = null
  const focus = () => {
    x = 'focus'
  }
  const blur = () => {
    x = 'blur'
  }
  const result = render(
    <div>
      <Wysiwyg onFocus={focus} onBlur={blur} />
      <button>test-button</button>
    </div>
  )
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  await userEvent.click(
    result.container.querySelector('.pxn-input-wysiwyg label')
  )
  expect(x).toBe('focus')
  await userEvent.click(result.getByText('test-button'))
  expect(x).toBe('blur')
})

test('Wysiwyg onChange', async () => {
  let x = ''
  const func = value => {
    x = value.replace('<p><br></p>', '')
  }
  const result = render(<Wysiwyg onChange={func} />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  await userEvent.type(result.container.querySelector('.ql-editor'), 'test')
  expect(x).toBe('<p>test</p>')
})

test('Wysiwyg onFocus', async () => {
  let x = null
  const func = () => {
    x = 'foo'
  }
  const result = render(<Wysiwyg onFocus={func} />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  await userEvent.click(
    result.container.querySelector('.pxn-input-wysiwyg label')
  )
  expect(x).toBe('foo')
})

test('Wysiwyg onKeyDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Wysiwyg onKeyDown={func} />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  await userEvent.type(result.container.querySelector('.ql-editor'), '{enter}')
  expect(x).toBe(result.container.querySelector('.ql-editor'))
})

test('Wysiwyg onKeyPress', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Wysiwyg onKeyPress={func} />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  fireEvent.keyPress(result.container.querySelector('.ql-editor'), {
    key: 'Enter',
    keyCode: 13
  })
  expect(x).toBe(result.container.querySelector('.ql-editor'))
})

test('Wysiwyg onKeyUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Wysiwyg onKeyUp={func} />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  await userEvent.type(result.container.querySelector('.ql-editor'), '{enter}')
  expect(x).toBe(result.container.querySelector('.ql-editor'))
})

test('Wysiwyg placeholder', async () => {
  const result = render(<Wysiwyg placeholder='enter some text' />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  expect(result.container.querySelector('.ql-editor')).toHaveAttribute(
    'data-placeholder',
    'enter some text'
  )
})

test('Wysiwyg readOnly', async () => {
  let x = 'x'
  const setX = value => {
    x = value
  }
  const result = render(<Wysiwyg value={x} valueHandler={setX} readOnly />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  await userEvent.type(result.container.querySelector('.ql-editor'), 'y')
  expect(x).toBe('<p>x</p>')
})

test('Wysiwyg tabIndex', async () => {
  const result = render(<Wysiwyg tabIndex='2' />)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  expect(result.container.querySelector('.ql-editor')).toHaveAttribute(
    'tabIndex',
    '2'
  )
})

test('Wysiwyg theme', async () => {
  const result = render(<Wysiwyg theme='snow' />)
  expect(result.container.querySelector('.ql-container')).toHaveClass('ql-snow')
  result.rerender(<Wysiwyg theme='bubble' />)
  expect(result.container.querySelector('.ql-container')).toHaveClass(
    'ql-bubble'
  )
})

test('Wysiwyg validator', async () => {
  const errMsg = 'I think you mean fubar!'
  const errClass = 'invalid-feedback'
  const func = value => {
    return value.match(/foobar/gi) ? errMsg : ''
  }
  let x = ''
  const setX = value => {
    x = value.replace('<p><br></p>', '')
  }
  const result = render(
    <Wysiwyg validator={func} valueHandler={setX} value={x} />
  )

  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  await userEvent.type(result.container.querySelector('.ql-editor'), 'f')
  expect(x).toBe('<p>f</p>')
  expect(result.container.querySelector('.' + errClass)).toBe(null)

  await userEvent.type(result.container.querySelector('.ql-editor'), 'ooba')
  expect(x).toBe('<p>fooba</p>')
  await userEvent.type(result.container.querySelector('.ql-editor'), 'r')
  expect(x).toBe('<p>foobar</p>')
  expect(result.getByText(errMsg)).toHaveClass(errClass)
  expect(result.container.querySelector('.' + errClass)).toBeInTheDocument()
  expect(result.container.querySelector('.' + errClass)).toBeVisible()
})

test('Wysiwyg value', async () => {
  const result = render(<Wysiwyg value='wagon wheel' />)
  expect(result.container.querySelector('.ql-editor').innerHTML).toBe(
    '<p>wagon wheel</p>'
  )
})

test('Wysiwyg valueHandler', async () => {
  let x = ''
  const setX = value => {
    x = value.replace('<p><br></p>', '')
  }
  const result = render(<Wysiwyg valueHandler={setX} value={x} />)

  await userEvent.type(result.container.querySelector('.ql-editor'), 'foobar')
  expect(x).toBe('<p>foobar</p>')
})
