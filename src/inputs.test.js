/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { Input } from '../dist/preaction-inputs.all.min.js'
import StandaloneInput from '../dist/preaction-inputs.input.min.js'
const assert = require('assert')

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('imports as ES module', () => {
  assert(Input !== undefined)
  assert(StandaloneInput !== undefined)
})