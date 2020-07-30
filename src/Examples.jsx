import React from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Input } from './Input.jsx'
import { Form } from './Form.jsx'
import { Select } from './Select.jsx'
import { Textarea } from './Textarea.jsx'
import { Checkbox } from './Checkbox.jsx'
import { Wysiwyg, Quill } from './Wysiwyg.jsx'

// for altering link behavior in Wysiwyg
const LinkFormat = Quill.import('formats/link')
class SmartLinkFormat extends LinkFormat {
  static create(value) {
    const node = super.create(value)
    node.addEventListener('click', event => {
      event.preventDefault()
      console.debug(node.href)
    })
    return node
  }
}
Quill.register('formats/link', SmartLinkFormat)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basicInput: '',
      checkbox: false,
      dateInput: '',
      emailInput: '',
      inputWith3CharacterMinimum: '',
      multipleEmailInput: '',
      numberInput: '',
      rangeInput: '',
      select: '',
      selectMultiple: [],
      textarea: '',
      timeInput: '',
      urlInput: '',
      wysiwyg: '',
      wysiwyg2: ''
    }
    this.wysiwyg = React.createRef()
    this.wysiwyg2 = React.createRef()
    this.getStateValueHandler = this.getStateValueHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getStateValueHandler(key) {
    return value => {
      this.setState(state => {
        state[key] = value
        return state
      })
    }
  }

  getValidator(key) {
    return {
      inputWith3CharacterMinimum: value => {
        let message = ''
        if (!value) {
          message = 'This field is required!'
        }
        return message
      }
    }[key]
  }

  test(event) {
    console.debug(event)
  }

  get year() {
    return new Date().getFullYear()
  }

  onSubmit(event) {
    event.preventDefault()
    console.debug(event.target.checkValidity())
  }

  render() {
    return (
      <div className='App'>
        <header>
          <div className='container'>
            <h1 className='display-4'>Preaction Inputs</h1>
          </div>
        </header>
        <main>
          <Form onSubmit={this.onSubmit} noValidate>
            <div className='container'>
              <div className='row'>
                <div className='col-sm'>
                  <div className='card mt-3'>
                    <div className='card-header'>Input</div>
                    <div className='card-body'>
                      <Input
                        label='Email'
                        type='email'
                        info='Enter any email but our example provided.'
                        placeholder='you@example.com'
                        value={this.state.emailInput}
                        valueHandler={value =>
                          this.setState(state =>
                            Object.assign(state, { emailInput: value })
                          )
                        }
                        validator={value =>
                          value === 'you@example.com' ? 'not you' : ''
                        }
                        required
                      />
                      <Input
                        label='Test Input'
                        info='test'
                        value={this.state.basicInput}
                        valueHandler={this.getStateValueHandler('basicInput')}
                        placeholder='with placeholder'
                        required
                      />
                      <Input
                        label='Input with 3-character minimum validator'
                        value={this.state.inputWith3CharacterMinimum}
                        valueHandler={this.getStateValueHandler(
                          'inputWith3CharacterMinimum'
                        )}
                        placeholder='with placeholder'
                        validator={this.getValidator(
                          'inputWith3CharacterMinimum'
                        )}
                        minLength='3'
                        required
                      />
                      <Input
                        label='Number Input, 0-10, 0.2 increments'
                        info='You can add informational buttons to any field.'
                        type='number'
                        value={this.state.numberInput}
                        valueHandler={this.getStateValueHandler('numberInput')}
                        min='0'
                        max='10'
                        step='0.2'
                      />
                      <Input
                        label='Date Input'
                        type='date'
                        min='2018-10-01'
                        max='2030-12-12'
                        value={this.state.dateInput}
                        valueHandler={this.getStateValueHandler('dateInput')}
                      />
                      <Input
                        label='Email Input'
                        type='email'
                        value={this.state.emailInput}
                        valueHandler={this.getStateValueHandler('emailInput')}
                        required
                      />
                      <Input
                        label='Multiple Email Input'
                        type='email'
                        value={this.state.multipleEmailInput}
                        valueHandler={this.getStateValueHandler(
                          'multipleEmailInput'
                        )}
                        multiple
                      />
                      <Input
                        label='URL Input'
                        type='url'
                        value={this.state.urlInput}
                        valueHandler={this.getStateValueHandler('urlInput')}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='card mt-3'>
                    <div className='card-header'>Select</div>
                    <div className='card-body'>
                      <Select
                        label='Test Select, single'
                        value={this.state.select}
                        valueHandler={this.getStateValueHandler('select')}
                        required>
                        <option />
                        <option>one</option>
                        <option>two</option>
                        <option>three</option>
                      </Select>
                      <Select
                        label='Test Select, multiple'
                        value={this.state.selectMultiple}
                        valueHandler={this.getStateValueHandler(
                          'selectMultiple'
                        )}
                        multiple
                        required>
                        <option>one</option>
                        <option>two</option>
                        <option>three</option>
                        <option>four</option>
                        <option>five</option>
                      </Select>
                    </div>
                  </div>
                  <div className='card mt-3'>
                    <div className='card-header'>Checkboxes</div>
                    <div className='card-body'>
                      <Checkbox
                        label='I Agree'
                        checked={this.state.checkbox}
                        valueHandler={this.getStateValueHandler('checkbox')}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='card mt-3'>
                    <div className='card-header'>Textarea</div>
                    <div className='card-body'>
                      <Textarea
                        label='Test Textarea'
                        info={
                          <span>
                            you can set this field to not resize by passing the{' '}
                            <code>noAutoResize</code> prop
                          </span>
                        }
                        required
                        value={this.state.textarea}
                        valueHandler={this.getStateValueHandler('textarea')}
                      />
                      <Wysiwyg
                        label='WYSIWYG Editor'
                        value={this.state.wysiwyg}
                        valueHandler={this.getStateValueHandler('wysiwyg')}
                        required
                        ref={this.wysiwyg}
                      />
                      <Wysiwyg
                        label='WYSIWYG with hidden toolbar'
                        placeholder='start typing here'
                        theme='bubble'
                        info='you can do info buttons here too!'
                        value={this.state.wysiwyg2}
                        valueHandler={this.getStateValueHandler('wysiwyg2')}
                        validator={value =>
                          'validators on wysiwyg has no impact on form validity. You should validate Wysiwyg values separately.'
                        }
                        ref={this.wysiwyg2}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='card mt-3'>
                    <div className='card-header'>Misc.</div>
                    <div className='card-body'>
                      <Input
                        label='Range'
                        type='range'
                        min='0'
                        max='10'
                        value={this.state.rangeInput}
                        valueHandler={this.getStateValueHandler('rangeInput')}
                      />
                      <Input
                        type='number'
                        min='0'
                        max='10'
                        value={this.state.rangeInput}
                        valueHandler={this.getStateValueHandler('rangeInput')}
                        required
                      />
                      <Input
                        label='Time'
                        type='time'
                        value={this.state.timeInput}
                        valueHandler={this.getStateValueHandler('timeInput')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='card mt-3'>
                    <div className='card-header bg-dark text-white'>
                      In Tables
                    </div>
                    <div className='card-body'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>Test Input</th>
                            <th>Test Select, single</th>
                            <th>Test Select, multiple</th>
                            <th>Test Textarea</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Input
                                value={this.state.basicInput}
                                valueHandler={this.getStateValueHandler(
                                  'basicInput'
                                )}
                                required
                              />
                            </td>
                            <td>
                              <Select
                                value={this.state.select}
                                valueHandler={this.getStateValueHandler(
                                  'select'
                                )}
                                required>
                                <option />
                                <option>one</option>
                                <option>two</option>
                                <option>three</option>
                              </Select>
                            </td>
                            <td>
                              <Select
                                multiple
                                value={this.state.selectMultiple}
                                valueHandler={this.getStateValueHandler(
                                  'selectMultiple'
                                )}
                                required>
                                <option>one</option>
                                <option>two</option>
                                <option>three</option>
                                <option>four</option>
                                <option>five</option>
                              </Select>
                            </td>
                            <td>
                              <Textarea
                                value={this.state.textarea}
                                valueHandler={this.getStateValueHandler(
                                  'textarea'
                                )}
                                required
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <input
                className='btn btn-primary mt-3'
                type='submit'
                value='Validate'
              />
            </div>
          </Form>
        </main>
      </div>
    )
  }

  componentDidMount() {
    if (window.sessionStorage.state) {
      this.setState(
        state => {
          state = JSON.parse(window.sessionStorage.state)
          return state
        },
        () => {
          // because wysiwyg editors need a kick in the ass
          this.wysiwyg.current.value = this.state.wysiwyg
          this.wysiwyg2.current.value = this.state.wysiwyg2
        }
      )
    }
  }

  componentDidUpdate() {
    window.sessionStorage.state = JSON.stringify(this.state)
  }
}

export default App
