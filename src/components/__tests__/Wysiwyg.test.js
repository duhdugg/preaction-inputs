import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Wysiwyg } from '../Wysiwyg.jsx'

const loadableComponent = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}

test('Wysiwyg basic', async () => {
  const result = render(<Wysiwyg />)
  console.debug(result.container.innerHTML)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
})

test('Wysiwyg allowDangerousFallback', async () => {
  const result = render(
    <Wysiwyg
      fallbackMode
      allowDangerousFallback
      value={'<div data-test="foo">bar</div>'}
    />
  )
  await waitFor(loadableComponent)
  expect(result.getByText('bar')).toHaveAttribute('data-test', 'foo')
})

test('Wysiwyg info', async () => {
  const result = render(<Wysiwyg info='contextual information' />)
  userEvent.click(result.container.querySelector('.btn-info'))
  await waitFor(() =>
    expect(result.getByText('contextual information')).toBeInTheDocument()
  )
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

test('Wysiwyg loadableFallback', () => {
  const result = render(<Wysiwyg loadableFallback='please wait' />)
  expect(result.getByText('please wait')).toHaveClass(
    'wysiwyg-loadable-fallback'
  )
})

test('Wysiwyg onBlur', async () => {
  let x = null
  const func = () => {
    x = 'foo'
  }
  const ref = React.createRef()
  const result = render(<Wysiwyg onBlur={func} ref={ref} />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  ref.current.quill.current.focus()
  ref.current.quill.current.blur()
  await waitFor(() => expect(x).toBe('foo'))
})

test('Wysiwyg onChange', async () => {
  let x = ''
  const func = value => {
    x = value
  }
  const result = render(<Wysiwyg onChange={func} />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  userEvent.type(result.container.querySelector('.ql-editor'), 'test')
  await waitFor(() => expect(x).toBe('<p>test</p>'))
})

test('Wysiwyg onFocus', async () => {
  let x = null
  const func = () => {
    x = 'foo'
  }
  const ref = React.createRef()
  const result = render(<Wysiwyg onFocus={func} ref={ref} />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  ref.current.quill.current.focus()
  await waitFor(() => expect(x).toBe('foo'))
})

test('Wysiwyg onKeyDown', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Wysiwyg onKeyDown={func} />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  userEvent.type(result.container.querySelector('.ql-editor'), '{enter}')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('.ql-editor'))
  )
})

test('Wysiwyg onKeyPress', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Wysiwyg onKeyPress={func} />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  userEvent.type(result.container.querySelector('.ql-editor'), '{enter}')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('.ql-editor'))
  )
})

test('Wysiwyg onKeyUp', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(<Wysiwyg onKeyUp={func} />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  userEvent.type(result.container.querySelector('.ql-editor'), '{enter}')
  await waitFor(() =>
    expect(x).toBe(result.container.querySelector('.ql-editor'))
  )
})

test('Wysiwyg placeholder', async () => {
  const result = render(<Wysiwyg placeholder='enter some text' />)
  await waitFor(loadableComponent)
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
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  userEvent.type(result.container.querySelector('.ql-editor'), 'y')
  await waitFor(() => expect(x).toBe('<p>x</p>'))
})

test('Wysiwyg tabIndex', async () => {
  const result = render(<Wysiwyg tabIndex='2' />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  expect(result.container.querySelector('.ql-editor')).toHaveAttribute(
    'tabIndex',
    '2'
  )
})

test('Wysiwyg theme', async () => {
  const result = render(<Wysiwyg theme='snow' />)
  await waitFor(loadableComponent)
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
    x = value
  }
  const ref = React.createRef()
  const result = render(
    <Wysiwyg validator={func} valueHandler={setX} value={x} ref={ref} />
  )
  const rerender = () => {
    result.rerender(
      <Wysiwyg validator={func} valueHandler={setX} value={x} ref={ref} />
    )
  }

  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor')).toBeInTheDocument()
  userEvent.type(result.container.querySelector('.ql-editor'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('<p>f</p>'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(!ref.current.validate(x)).toBe(true)

  userEvent.type(result.container.querySelector('.ql-editor'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('<p>fo</p>'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(!ref.current.validate(x)).toBe(true)

  userEvent.type(result.container.querySelector('.ql-editor'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('<p>foo</p>'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(!ref.current.validate(x)).toBe(true)

  userEvent.type(result.container.querySelector('.ql-editor'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('<p>foob</p>'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(!ref.current.validate(x)).toBe(true)

  userEvent.type(result.container.querySelector('.ql-editor'), 'a')
  rerender()
  await waitFor(() => expect(x).toBe('<p>fooba</p>'))
  expect(result.container.querySelector('.' + errClass)).toBe(null)
  expect(!ref.current.validate(x)).toBe(true)

  userEvent.type(result.container.querySelector('.ql-editor'), 'r')
  rerender()
  await waitFor(() => expect(x).toBe('<p>foobar</p>'))
  expect(result.getByText(errMsg)).toHaveClass(errClass)
  expect(result.container.querySelector('.' + errClass)).toBeInTheDocument()
  expect(result.container.querySelector('.' + errClass)).toBeVisible()
  expect(!ref.current.validate(x)).toBe(false)
})

test('Wysiwyg value', async () => {
  const result = render(<Wysiwyg value='wagon wheel' />)
  await waitFor(loadableComponent)
  expect(result.container.querySelector('.ql-editor').innerHTML).toBe(
    '<p>wagon wheel</p>'
  )
})

test('Wysiwyg valueHandler', async () => {
  let x = ''
  const setX = value => {
    x = value
  }
  const result = render(<Wysiwyg valueHandler={setX} value={x} />)
  const rerender = () => {
    result.rerender(<Wysiwyg valueHandler={setX} value={x} />)
  }
  await waitFor(loadableComponent)

  userEvent.type(result.container.querySelector('.ql-editor'), 'f')
  rerender()
  await waitFor(() => expect(x).toBe('<p>f</p>'))

  userEvent.type(result.container.querySelector('.ql-editor'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('<p>fo</p>'))

  userEvent.type(result.container.querySelector('.ql-editor'), 'o')
  rerender()
  await waitFor(() => expect(x).toBe('<p>foo</p>'))

  userEvent.type(result.container.querySelector('.ql-editor'), 'b')
  rerender()
  await waitFor(() => expect(x).toBe('<p>foob</p>'))

  userEvent.type(result.container.querySelector('.ql-editor'), 'a')
  rerender()
  await waitFor(() => expect(x).toBe('<p>fooba</p>'))

  userEvent.type(result.container.querySelector('.ql-editor'), 'r')
  rerender()
  await waitFor(() => expect(x).toBe('<p>foobar</p>'))
})
