import PropTypes from 'prop-types'
import React from 'react'
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'

// Quill depends heavily on DOM. These conditional assignments allow SSR.
const ssr = typeof window === 'undefined'

// using this assignment pattern to also allow importing react-quill from CDN
let ReactQuill
try {
  ReactQuill = loadable(() => timeout(import('react-quill'), 5000), {
    ssr: false
  })
} catch (e) {
  ReactQuill = ssr
    ? function () {
        return <div />
      }
    : window.ReactQuill
}

let defaultValidator = value => {
  return ''
}

/**
 * All the elements you need to render a WYSIWYG input
 * This uses the Quill Rich Text Editor and the `react-quill` library. To import the `Quill` class for customizing Quill's behavior via `Quill.import` and `Quill.register`, you would need to `import { Quill } from 'react-quill'` in your application.
 * @see [quilljs.com](https://quilljs.com/)
 * @see [react-quill](https://github.com/zenoamaro/react-quill)
 */
class Wysiwyg extends React.Component {
  constructor(props) {
    super(props)
    this.genid()
    this.state = {
      // ssr will force fallbackMode
      fallbackMode: ssr || this.props.fallbackMode,
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
    this.id = `pxn-wysiwyg-${now}-${rand}`
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
      <div className='pxn-input pxn-input-wysiwyg'>
        <label
          htmlFor={this.id}
          style={this.labelStyle}
          onClick={this.focus}
          className='form-label'>
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
            <div className='mock quill'>
              <div className={`ql-container ql-${this.theme}`}>
                <div className='ql-editor'>
                  <div dangerouslySetInnerHTML={{ __html: this.value }} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <span className='badge badge-danger'>
                Error: could not load Wysiwyg component. Try refreshing the
                page.
              </span>
            </div>
          )
        ) : (
          <ReactQuill
            bounds={this.props.bounds}
            className={this.props.className}
            debug={this.props.debug}
            formats={this.formats}
            modules={this.modules}
            onChange={this.onChange}
            onChangeSelection={this.props.onChangeSelection}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onKeyPress={this.props.onKeyPress}
            onKeyDown={this.props.onKeyDown}
            onKeyUp={this.props.onKeyUp}
            placeholder={this.props.placeholder}
            preserveWhitespace={this.props.preserveWhitespace}
            readOnly={this.props.readOnly}
            ref={this.quill}
            style={this.props.style}
            tabIndex={
              this.props.tabIndex ? Number(this.props.tabIndex) : undefined
            }
            theme={this.theme}
            value={this.value}
            fallback={
              <div className='wysiwyg-loadable-fallback'>
                {this.props.loadableFallback}
              </div>
            }>
            {this.props.children}
          </ReactQuill>
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
  /** passed directly to `<ReactQuill>` */
  bounds: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** passed directly to `<ReactQuill>` */
  children: PropTypes.node,
  /** passed directly to `<ReactQuill>` */
  className: PropTypes.string,
  /** passed directly to `<ReactQuill>` */
  debug: PropTypes.bool,
  /** setting this to `true` will force the component to go into `fallbackMode`, which may either display an error or try to render the value natively, according to the value of `allowDangerousFallback` */
  fallbackMode: PropTypes.bool,
  /** information which may be toggled by clicking a button next to the label */
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** by default, this will render a bold, monospaced, lowercase i. This button will not be rendered if `info` is falsey. */
  infoBtnContents: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** value will be rendered inside `<label>` element. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** sets the fallback prop on `<ReactQuill>`, which is loaded via `@loadable/component`. This is what appears when the `<ReactQuill>` component has not yet loaded. */
  loadableFallback: PropTypes.node,
  /** override the default modules to pass onto `ReactQuill` */
  modules: PropTypes.object,
  onChange: PropTypes.func,
  /** passed directly to `<ReactQuill>` */
  onChangeSelection: PropTypes.func,
  /** passed directly to `<ReactQuill>` */
  onFocus: PropTypes.func,
  /** passed directly to `<ReactQuill>` */
  onBlur: PropTypes.func,
  /** passed directly to `<ReactQuill>` */
  onKeyPress: PropTypes.func,
  /** passed directly to `<ReactQuill>` */
  onKeyDown: PropTypes.func,
  /** passed directly to `<ReactQuill>` */
  onKeyUp: PropTypes.func,
  /** passed directly to `<ReactQuill>` */
  placeholder: PropTypes.string,
  /** passed directly to `<ReactQuill>` */
  preserveWhitespace: PropTypes.bool,
  /** passed directly to `<ReactQuill>` */
  readOnly: PropTypes.bool,
  /** passed directly to `<ReactQuill>` */
  style: PropTypes.object,
  /** passed directly to `<ReactQuill>` */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  loadableFallback: 'Loading...',
  readOnly: false,
  theme: 'snow'
}

export { Wysiwyg }
