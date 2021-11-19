import PropTypes from 'prop-types'
import React from 'react'
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'

const test = process.env.NODE_ENV === 'test'

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
function Wysiwyg(props) {
  const [value, setValue] = React.useState(props.value || '')
  const [valid, setValid] = React.useState(undefined)
  const [validationMessage, setValidationMessage] = React.useState('')
  const elementId = React.useRef(`pxn-wysiwyg-${+new Date()}-${Math.random()}`)
  const labelStyle = { cursor: 'pointer' }
  const quill = React.useRef()
  const focus = () => {
    if (quill.current) {
      quill.current.focus()
    }
  }
  const [showInfo, setShowInfo] = React.useState(false)
  const toggleInfo = () => setShowInfo(!showInfo)
  const fallbackMode = ssr || props.fallbackMode
  const formats = [
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
  const theme = props.theme || 'snow'
  const toolbar = props.toolbar || [
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
  const modules = props.modules || {
    toolbar
  }
  const onChange = value => {
    setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
    validate(value)
    if (props.valueHandler) {
      props.valueHandler(value)
    }
  }
  const ref = React.useRef()
  const validator = props.validator || defaultValidator
  const validate = React.useCallback(
    value => {
      const vm = validator(value)
      const valid = !vm
      setValid(valid)
      setValidationMessage(vm)
      return vm
    },
    [setValid, setValidationMessage, validator]
  )
  React.useEffect(() => {
    if (ref.current) {
      ref.current.validate = () => validate(value)
    }
  }, [ref, validate, value])
  const retval = (
    <div
      className='pxn-input pxn-input-wysiwyg'
      ref={ref}
      onBlur={test ? props.onBlur : undefined}>
      <label
        htmlFor={elementId.current}
        style={labelStyle}
        onClick={focus}
        className='form-label'>
        {props.label}
        {props.info ? (
          <button
            type='button'
            className='btn btn-sm btn-info ml-1 pt-0 pb-0'
            onClick={toggleInfo}>
            {props.infoBtnContents || (
              <span className='font-weight-bold text-monospace'>i</span>
            )}
          </button>
        ) : (
          ''
        )}
      </label>
      {props.info && showInfo ? (
        <div
          className='alert alert-info'
          style={{ fontSize: '0.875rem', padding: '0.875rem' }}>
          {props.info}
        </div>
      ) : (
        ''
      )}
      {fallbackMode ? (
        props.allowDangerousFallback ? (
          <div className='mock quill'>
            <div className={`ql-container ql-${theme}`}>
              <div className='ql-editor'>
                <div dangerouslySetInnerHTML={{ __html: value }} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span className='badge badge-danger'>
              Error: could not load Wysiwyg component. Try refreshing the page.
            </span>
          </div>
        )
      ) : (
        <ReactQuill
          bounds={props.bounds}
          className={props.className}
          debug={props.debug}
          formats={formats}
          modules={modules}
          onChange={onChange}
          onChangeSelection={props.onChangeSelection}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyPress={props.onKeyPress}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          placeholder={props.placeholder}
          preserveWhitespace={props.preserveWhitespace}
          readOnly={props.readOnly}
          ref={quill}
          style={props.style}
          tabIndex={props.tabIndex ? Number(props.tabIndex) : undefined}
          theme={theme}
          value={value}
          fallback={
            <div className='wysiwyg-loadable-fallback'>
              {props.loadableFallback}
            </div>
          }>
          {props.children}
        </ReactQuill>
      )}
      <div className='validator'>
        {valid ? (
          ''
        ) : (
          <div className='invalid-feedback d-block' aria-live='polite'>
            {validationMessage}
          </div>
        )}
      </div>
    </div>
  )
  return retval
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
