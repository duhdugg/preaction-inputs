import PropTypes from 'prop-types'
import React from 'react'
import AsterCheck from './AsterCheck.jsx'
import ReactQuill, { Quill } from 'react-quill'

const ssr = typeof window === 'undefined'

let defaultValidator = value => {
  return ''
}

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props)
    this.genid()
    this.state = {
      fallbackMode: ssr || this.props.fallbackMode,
      pristine: true,
      showInfo: false,
      valid: true,
      validationMessage: '',
      value: ''
    }
    if (this.props.value) {
      this.state.value = this.props.value
    }
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
          this.props.allowDangerousFallback ? (
            <div className='quill'>
              <div className={`ql-container ql-${this.theme}`}>
                <div className='ql-editor'>
                  <div dangerouslySetInnerHTML={{ __html: this.value }} />
                </div>
              </div>
            </div>
          ) : (
            <div className='input-group'>
              <span className='badge badge-danger'>
                Error: could not load WYSIWYG
              </span>
            </div>
          )
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

  componentDidUpdate(prevProps) {
    if (this.state.pristine) {
      this.setState({ pristine: false })
    }
    if (this.props.fallbackMode !== prevProps.fallbackMode) {
      this.setState({ fallbackMode: this.props.fallbackMode })
    }
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value })
    }
  }
}

Wysiwyg.propTypes = {
  allowDangerousFallback: PropTypes.bool,
  className: PropTypes.string,
  debug: PropTypes.bool,
  fallbackMode: PropTypes.bool,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  infoBtnContents: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  modules: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  scrollingContainer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object)
  ]),
  theme: PropTypes.string,
  toolbar: PropTypes.array,
  validator: PropTypes.func,
  value: PropTypes.string,
  valueHandler: PropTypes.func
}

export { Wysiwyg, Quill }
