import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Form } from '../Form.jsx'
import { Checkbox } from '../Checkbox.jsx'
import { Input } from '../Input.jsx'
import { Select } from '../Select.jsx'
import { Textarea } from '../Textarea.jsx'
import { Wysiwyg } from '../Wysiwyg.jsx'

test('Form basic', () => {
  const result = render(<Form />)
  expect(result.container.querySelector('form')).toBeInTheDocument()
})

test('Form onReset', async () => {
  let x = null
  const func = event => {
    x = event.target
  }
  const result = render(
    <Form onReset={func}>
      <button type='reset'>reset</button>
    </Form>
  )
  await userEvent.click(result.getByText('reset'))
  expect(x).toBe(result.container.querySelector('form'))
})

test('Form onSubmit', async () => {
  let x = null
  const func = event => {
    event.preventDefault()
    x = event.target
  }
  const result = render(
    <Form onSubmit={func}>
      <Checkbox />
      <Input />
      <Select multiple>
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </Select>
      <Textarea />
      <button type='submit'>submit</button>
    </Form>
  )
  await userEvent.click(result.getByText('submit'))
  expect(x).toBe(result.container.querySelector('form'))
})

test('Form validation', async () => {
  let x = null
  const func = event => {
    event.preventDefault()
    x = event.target
  }
  const result = render(
    <Form onSubmit={func}>
      <Checkbox required validator={value => 'invalid'} />
      <Input required validator={value => 'invalid'} />
      <Select multiple required validator={value => 'invalid'}>
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </Select>
      <Textarea required validator={value => 'invalid'} />
      <Wysiwyg validator={value => 'invalid'} />
      <button type='submit'>submit</button>
    </Form>
  )
  await userEvent.click(result.getByText('submit'))
  expect(x).toBe(null)
})
