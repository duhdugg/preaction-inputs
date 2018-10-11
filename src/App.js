import React from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Input from './Input.js'
import Form from './Form.js'
import Select from './Select.js'
import Textarea from './Textarea.js'
import Checkbox from './Checkbox.js'
import WysiwygEditor from './WysiwygEditor.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      basicInput: '',
      inputWith3CharacterMinimum: '',
      numberInput: '',
      dateInput: '',
      emailInput: '',
      multipleEmailInput: '',
      urlInput: '',
      select: '',
      selectMultiple: [],
      textarea: '',
      wysiwyg: '',
      wysiwyg2: '',
      checkbox: false,
      rangeInput: '',
      timeInput: ''
    }
    this.wysiwyg = React.createRef()
    this.wysiwyg2 = React.createRef()
    this.getValue = this.getValue.bind(this)
    this.setValue = this.setValue.bind(this)
    this.getValidator = this.getValidator.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getValue (key) {
    let retval = this.state[key]
    return retval
  }

  setValue (key, value) {
    this.setState(state => {
      state[key] = value
      return state
    })
  }

  getValidator (key) {
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

  test (event) {
    console.debug(event)
  }

  get year () {
    return new Date().getFullYear()
  }

  onSubmit (event) {
    console.debug(event.target.checkValidity())
  }

  render () {
    return (
      <div className="App">
        <header>
          <div className='container'>
            <h1 className='display-4'>Preaction Inputs</h1>
          </div>
        </header>
        <main>
          <Form onSubmit={ this.onSubmit }>
            <div className='container'>
              <div className='row'>
                <div className='col-sm'>
                  <div className='card mt-3'>
                    <div className='card-header'>
                      Input
                    </div>
                    <div className='card-body'>
                      <Input
                        label='Test Input'
                        name='basicInput'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        placeholder='with placeholder'
                        required
                      />
                      <Input
                        label='Input with 3-character minimum validator'
                        name='inputWith3CharacterMinimum'
                        minLength='3'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                      />
                      <Input
                        label='Number Input, 0-10, 0.2 increments'
                        name='numberInput'
                        type='number'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        min='0'
                        max='10'
                        step='0.2'
                      />
                      <Input
                        label='Date Input'
                        name='dateInput'
                        type='date'
                        min='2018-10-01'
                        max='2019-12-12'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                      />
                      <Input
                        label='Email Input'
                        name='emailInput'
                        type='email'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        required
                      />
                      <Input
                        label='Multiple Email Input'
                        name='multipleEmailInput'
                        type='email'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        multiple
                      />
                      <Input
                        label='URL Input'
                        name='urlInput'
                        type='url'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                      />
                    </div>
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='card mt-3'>
                    <div className='card-header'>
                      Select
                    </div>
                    <div className='card-body'>
                      <Select
                        label='Test Select, single'
                        name='select'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        required
                      >
                        <option></option>
                        <option>one</option>
                        <option>two</option>
                        <option>three</option>
                      </Select>
                      <Select
                        label='Test Select, multiple'
                        name='selectMultiple'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        multiple
                        required
                      >
                        <option>one</option>
                        <option>two</option>
                        <option>three</option>
                      </Select>
                    </div>
                  </div>
                  <div className='card mt-3'>
                    <div className='card-header'>
                      Checkboxes
                    </div>
                    <div className='card-body'>
                      <Checkbox
                        label='I Agree'
                        name='checkbox'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='card mt-3'>
                    <div className='card-header'>
                      Textarea
                    </div>
                    <div className='card-body'>
                      <Textarea
                        label='Test Textarea'
                        name='textarea'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                      />
                      <WysiwygEditor
                        label='WYSIWYG Editor'
                        name='wysiwyg'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        ref={this.wysiwyg}
                      />
                      <WysiwygEditor
                        label='WYSIWYG Editor'
                        name='wysiwyg2'
                        placeholder='with placeholder'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                        ref={this.wysiwyg2}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='card mt-3'>
                    <div className='card-header'>
                      Misc.
                    </div>
                    <div className='card-body'>
                      <Input
                        label='Range'
                        name='rangeInput'
                        type='range'
                        min='1'
                        max='10'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                      />
                      <Input
                        name='rangeInput'
                        type='number'
                        min='1'
                        max='10'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                      />
                      <Input
                        label='Time'
                        name='timeInput'
                        type='time'
                        getValue={ this.getValue }
                        setValue={ this.setValue }
                        getValidator={ this.getValidator }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <input type="submit" value="Validate" />
            </div>
          </Form>
        </main>
        <footer>
          <div className='container'>
            Doug Elkin &copy; {this.year}
          </div>
        </footer>
      </div>
    )
  }

  componentDidMount () {
    if (window.sessionStorage.state) {
      this.setState(state => {
        state = JSON.parse(window.sessionStorage.state)
        return state
      }, () => {
        // because wysiwyg editors need a kick in the ass
        this.wysiwyg.current.value = this.state.wysiwyg
        this.wysiwyg2.current.value = this.state.wysiwyg2
      })
    }
  }

  componentDidUpdate () {
    window.sessionStorage.state = JSON.stringify(this.state)
  }
}

export default App
