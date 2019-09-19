import React from 'react'
import AsterCheck from './AsterCheck.jsx'
import createDOMPurify from 'dompurify'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'

let defaultValidator = value => {
  return ''
}

// currently, the default link format in quill
// sets all anchor targets to "_blank"
// relative links should open within the same window

const LinkFormat = Quill.import('formats/link')
class SmartLinkFormat extends LinkFormat {
  static create(value) {
    const node = super.create(value)
    const linkType = value[0] === '/' ? 'internal' : 'external'
    if (linkType === 'internal') {
      node.setAttribute('target', '_self')
      // we also need a way for internal links to play nice with react-router
      node.onClick = e => {
        e.preventDefault()
        console.debug(`FIXME: ${this.sanitize(value)}`)
      }
    }
    return node
  }
}
Quill.register('formats/link', SmartLinkFormat)

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props)
    this.genid()
    this.state = {
      fallbackMode: false,
      pristine: true,
      showInfo: false,
      valid: true,
      validationMessage: '',
      value: ''
    }
    if (this.props.value) {
      this.state.value = this.props.value
    }
    this.DOMPurify = null
    this.focus = this.focus.bind(this)
    this.onChange = this.onChange.bind(this)
    this.toggleInfo = this.toggleInfo.bind(this)
    this.validate = this.validate.bind(this)
    this.quill = React.createRef()
  }

  componentDidCatch(error, info) {
    console.debug('enabling fallback mode due to error', error, info)
    this.setState(state => {
      state.fallbackMode = true
      return state
    })
  }

  focus() {
    if (this.quill.current) {
      this.quill.current.focus()
    }
  }

  genid() {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction-wysiwyg-${now}-${rand}`
    return this.id
  }

  get labelStyle() {
    return {
      cursor: 'pointer'
    }
  }

  get formats() {
    return [
      'align',
      'background',
      'blockquote',
      'bold',
      'code-block',
      'code',
      'color',
      'font',
      'header',
      'image',
      'indent',
      'italic',
      'link',
      'list',
      'size',
      'strike',
      'video'
    ]
  }

  get theme() {
    return this.props.theme || 'snow'
  }

  get toolbar() {
    // must also be enabled in formats
    return (
      this.props.toolbar || [
        [{ header: [] }, { font: [] }],
        ['code', 'bold', 'italic', 'strike'],
        [{ color: [] }, { background: [] }],
        [
          'blockquote',
          { indent: '-1' },
          { indent: '+1' },
          { list: 'bullet' },
          { list: 'ordered' },
          'code-block'
        ],
        ['link', 'image', 'video']
      ]
    )
  }

  get modules() {
    return (
      this.props.modules || {
        toolbar: this.toolbar
      }
    )
  }

  get sanitizedValue() {
    let value = ''
    if (this.DOMPurify) {
      value = this.DOMPurify.sanitize(this.value)
    }
    return value
  }

  get validationMessage() {
    return this.state.validationMessage
  }

  get validator() {
    return this.props.validator || defaultValidator
  }

  get value() {
    return this.state.value
  }

  set value(value) {
    this.setState(
      state => {
        state.value = value
        return state
      },
      () => {
        this.validate(value)
        if (this.props.valueHandler) {
          this.props.valueHandler(value)
        }
      }
    )
  }

  onChange(value) {
    this.value = value
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  toggleInfo() {
    this.setState(state => {
      state.showInfo = !state.showInfo
      return state
    })
  }

  validate(value) {
    let validationMessage = this.validator(value)
    let valid = !validationMessage
    this.setState(state => {
      state.valid = valid
      state.validationMessage = validationMessage
      return state
    })
    return validationMessage
  }

  render() {
    return (
      <div className='preaction wysiwyg mb-3'>
        <label htmlFor={this.id} style={this.labelStyle} onClick={this.focus}>
          {this.props.label}
          {this.props.info ? (
            <button
              type='button'
              className='btn btn-sm btn-info ml-1 pt-0 pb-0'
              onClick={this.toggleInfo}>
              {this.props.infoBtnContents || (
                <span className='font-weight-bold text-monospace'>i</span>
              )}
            </button>
          ) : (
            ''
          )}
          {this.props.required ? (
            <AsterCheck valid={!this.validationMessage} />
          ) : (
            ''
          )}
        </label>
        {this.props.info && this.state.showInfo ? (
          <div
            className='alert alert-info'
            style={{ fontSize: '0.875rem', padding: '0.875rem' }}>
            {this.props.info}
          </div>
        ) : (
          ''
        )}
        {this.state.fallbackMode ? (
          <div className='input-group'>
            <span className='badge badge-danger'>could not load editor</span>
            <div
              className='col-12'
              dangerouslySetInnerHTML={{ __html: this.sanitizedValue }}
            />
          </div>
        ) : (
          <ReactQuill
            className={this.props.className}
            debug={this.props.debug}
            formats={this.formats}
            modules={this.modules}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            ref={this.quill}
            scrollingContainer={this.props.scrollingContainer}
            theme={this.theme}
            value={this.value}
          />
        )}
        <div className='validator'>
          {this.state.valid ? (
            ''
          ) : (
            <div className='invalid-feedback d-block' aria-live='polite'>
              {this.validationMessage}
            </div>
          )}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.DOMPurify = createDOMPurify(window)
  }

  componentDidUpdate() {
    if (this.state.pristine) {
      this.setState(state => {
        state.pristine = false
        return state
      })
    }
  }
}

export default Wysiwyg
