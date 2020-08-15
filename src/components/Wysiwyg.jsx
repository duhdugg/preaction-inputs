import PropTypes from 'prop-types'
import React from 'react'

// Quill depends heavily on DOM. These conditional assignments allow SSR.
const ssr = typeof window === 'undefined'
class MockQuill extends React.Component {
  render() {
    return <div />
  }
}
MockQuill.Quill = {
  import: () => false,
  register: () => false
}
// using this assignment pattern to also support hot-module reloading
let ReactQuill
// this if/else block is needed to support UMD builds in browser
if (typeof require === 'undefined') {
  ReactQuill = window.ReactQuill
} else {
  ReactQuill = ssr ? MockQuill : require('react-quill')
}
const Quill = ReactQuill.Quill

let defaultValidator = value => {
  return ''
}

/**
 * All the elements you need to render a WYSIWYG input
 * This uses the Quill Rich Text Editor and the `react-quill` library. The `Quill` class is also to allow you to call `Quill.import` and `Quill.register`
 * @see [quilljs.com](https://quilljs.com/)
 * @see [react-quill](https://github.com/zenoamaro/react-quill)
 */
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
  /** allows using the `dangerouslySetInnerHTML` attribute to render the value while in `fallbackMode`. **Do not set this to true unless you have sanitized `value`!** */
  allowDangerousFallback: PropTypes.bool,
  /** the className to pass to `ReactQuill` */
  className: PropTypes.string,
  /** passes the debug prop to `ReactQuill` */
  debug: PropTypes.bool,
  /** setting this to `true` will force the component to go into `fallbackMode`, which may either display an error or try to render the value natively, according to the value of `allowDangerousFallback` */
  fallbackMode: PropTypes.bool,
  /** information which may be toggled by clicking a button next to the label */
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** by default, this will render a bold, monospaced, lowercase i. This button will not be rendered if `info` is falsey. */
  infoBtnContents: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** value will be rendered inside `<label>` element. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** override the default modules to pass onto `ReactQuill` */
  modules: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  /** passes the `scrollingContainer` prop to `ReactQuill` */
  scrollingContainer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object)
  ]),
  /** the Quill theme. defaults available are `bubble` and `snow`, but you must import the CSS required */
  theme: PropTypes.string,
  /** use this if you want to override the toolbar in Quill. */
  toolbar: PropTypes.array,
  /** function which accepts a value and returns an error message or empty string. See the NPM package [@preaction/validation](https://www.npmjs.com/package/@preaction/validation) */
  validator: PropTypes.func,
  value: PropTypes.string,
  /** callback which accepts a value. Use this to set state. It is triggered by the default `onChange` handler. */
  valueHandler: PropTypes.func
}

Wysiwyg.defaultProps = {
  allowDangerousFallback: false,
  debug: false,
  fallbackMode: false,
  readOnly: false,
  required: false,
  theme: 'snow'
}

export { Wysiwyg, Quill }
