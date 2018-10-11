import React from 'react'
import ReactQuill from 'react-quill'
import createDOMPurify from 'dompurify'
import 'react-quill/dist/quill.snow.css'

let defaultValidator = value => { return '' }

class WysiwygEditor extends React.Component {
  constructor (props) {
    super(props)
    this.genid()
    this.state = {
      fallbackMode: false,
      validationMessage: '',
      valid: true,
      value: ''
    }
    this.DOMPurify = null
    this.focus = this.focus.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.quill = React.createRef()
  }

  componentDidCatch (error, info) {
    console.debug('enabling fallback mode due to error', error, info)
    this.setState(state => {
      state.fallbackMode = true
      return state
    })
  }

  focus () {
    if (this.quill.current) {
      this.quill.current.focus()
    }
  }

  genid () {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction-wysiwyg-${now}-${rand}`
    return this.id
  }

  get labelStyle () {
    return {
      cursor: 'pointer'
    }
  }

  get formats () {
    return [
      'background',
      'blockquote',
      'bold',
      'code',
      'code-block',
      'color',
      'font',
      'header',
      'image',
      'indent',
      'italic',
      'link',
      'list',
      'strike',
      'video'
    ]
  }

  get theme () {
    return this.props.theme || 'snow'
  }

  get toolbar () {
    // must also be enabled in formats
    return this.props.toolbar || [
      [
        { header: [] },
        { font: [] }
      ],
      [
        'code',
        'bold',
        'italic',
        'strike'
      ],
      [
        { color: [] },
        { background: [] }
      ],
      [
        'blockquote',
        { indent: '-1' },
        { indent: '+1' },
        { list: 'ordered' },
        { list: 'bullet' },
        'code-block'
      ],
      [
        'image',
        'video'
      ]
    ]
  }

  get modules () {
    return this.props.modules || {
      toolbar: this.toolbar
    }
  }

  get sanitizedValue () {
    let value = ''
    if (this.DOMPurify) {
      value = this.DOMPurify.sanitize(this.value)
    }
    return value
  }

  get validationMessage () {
    return this.state.validationMessage
  }

  get validator () {
    let validator = defaultValidator
    if (this.props.getValidator) {
      validator = this.props.getValidator(this.props.name) || defaultValidator
    }
    return validator
  }

  get value () {
    return this.state.value
  }

  set value (value) {
    this.setState(state => {
      state.value = value
      return state
    }, () => {
      this.validate(value)
      if (this.props.setValue) {
        this.props.setValue(this.props.name, value)
      }
    })
  }

  onChange (value) {
    this.value = value
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  validate (value) {
    let validationMessage = this.validator(value)
    let valid = !validationMessage
    this.setState(state => {
      state.valid = valid
      state.validationMessage = validationMessage
      return state
    })
    return validationMessage
  }

  render () {
    return (
      <div className='preaction wysiwyg'>
        <label htmlFor={this.id} style={this.labelStyle} onClick={this.focus}>{this.props.label}</label>
        {this.state.fallbackMode
          ? <div className='input-group'>
            <span className='badge badge-danger'>could not load editor</span>
            <div className='col-12' dangerouslySetInnerHTML={{ __html: this.sanitizedValue }}></div>
          </div>
          : <ReactQuill
            value={this.value}
            debug={this.props.debug}
            formats={this.formats}
            modules={this.modules}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            scrollingContainer={this.props.scrollingContainer}
            theme={this.theme}
            ref={this.quill}
          />}
        <div className='validator'>
          {this.state.valid ? '' : <div className='invalid-tooltip d-block' aria-live='polite'>{this.validationMessage}</div>}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.DOMPurify = createDOMPurify(window)
  }
}

export default WysiwygEditor
