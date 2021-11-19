import PropTypes from 'prop-types'
import React from 'react'

const validatorMessageTypes = ['feedback', 'tooltip']

let defaultValidator = value => {
  return ''
}

/**
 * All the elements you need to render a `<textarea>` in bootstrap. By default, it will automatically resize as you type.
 * @see [Bootstrap Documentation: Forms](https://getbootstrap.com/docs/5.0/forms/overview/)
 * @see [MDN web docs: `<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
 */
function Textarea(props) {
  const elementId = React.useRef(`pxn-textarea-${+new Date()}-${Math.random()}`)
  const [height, setHeight] = React.useState('auto')
  const [showInfo, setShowInfo] = React.useState(false)
  const hiddenDiv = React.useRef()
  const textarea = React.useRef()

  const autoResize = () => {
    if (hiddenDiv.current) {
      if (height !== hiddenDiv.current.clientHeight) {
        let height = hiddenDiv.current.clientHeight
        if (!textarea.current.value) {
          let h = height * 3
          if (!h) {
            // minimum
            h = 16
          }
          if (height !== h) {
            setHeight(h)
          }
        } else {
          setHeight(height)
        }
      }
    }
  }

  const hiddenDivStyle = {
    height: 'auto',
    left: '-0.06em',
    overflowWrap: 'break-word',
    padding: '0.375rem 0.75rem',
    position: 'absolute',
    top: '0',
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
    width: textarea.current ? textarea.current.clientWidth : '100%',
    zIndex: -999
  }

  const labelStyle = {
    cursor: 'pointer',
    position: props.label ? undefined : 'absolute',
    zIndex: props.label ? undefined : '10'
  }

  const onFocus = e => {
    if (!props.noAutoResize) {
      autoResize()
    }
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const textareaStyle = {
    height:
      height +
      (props.labelFloat ? 24 : 0) +
      (textarea.current && textarea.current.value.match(/\n$/) ? 24 : 0),
    resize: props.noAutoResize ? 'vertical' : 'none',
    overflow: props.noAutoResize ? 'auto' : 'hidden'
  }

  const placeholder = props.placeholder || (props.labelFloat ? props.label : '')

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const getValidationMessage = () => {
    return textarea.current ? textarea.current.validationMessage : ''
  }

  const getValidator = () => {
    return props.validator || defaultValidator
  }

  const onChange = event => {
    validate(event.target.value)
    if (props.onChange) {
      event.persist()
      props.onChange(event)
    }
    if (props.valueHandler) {
      props.valueHandler(event.target.value)
    }
  }

  const validate = value => {
    let validationMessage = getValidator()(value)
    textarea.current.setCustomValidity(validationMessage)
    textarea.current.checkValidity()
    return validationMessage
  }

  const validationMessage = getValidationMessage()

  React.useEffect(() => {
    textarea.current.validate = validate
  })

  React.useEffect(() => {
    if (!props.noAutoResize) {
      autoResize()
    }
  })

  return (
    <div
      className={[
        'pxn-input',
        'pxn-input-textarea',
        props.labelFloat ? 'form-floating' : '',
        props.validatorMessageType === 'tooltip' ? 'position-relative' : ''
      ]
        .filter(x => !!x.length)
        .join(' ')}>
      {props.labelFloat ? (
        ''
      ) : (
        <label
          htmlFor={elementId.current}
          style={labelStyle}
          className='form-label'>
          {props.label}{' '}
          {props.label && props.required ? (
            <span className='text-danger fw-bold'>*</span>
          ) : (
            ''
          )}
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
      )}
      {props.info && showInfo ? (
        <div
          className='alert alert-info'
          style={{ fontSize: '0.875rem', padding: '0.875rem' }}>
          {props.info}
        </div>
      ) : (
        ''
      )}
      <textarea
        id={elementId.current}
        name={props.name}
        className='form-control'
        autoComplete={props.autoComplete}
        required={props.required}
        readOnly={props.readOnly}
        disabled={props.disabled}
        value={props.value}
        maxLength={props.maxLength}
        minLength={props.minLength}
        tabIndex={props.tabIndex}
        onBlur={props.onBlur}
        onChange={onChange}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        onDoubleClick={props.onDoubleClick}
        onDrag={props.onDrag}
        onDragEnd={props.onDragEnd}
        onDragEnter={props.onDragEnter}
        onDragLeave={props.onDragLeave}
        onDragOver={props.onDragOver}
        onDragStart={props.onDragStart}
        onDrop={props.onDrop}
        onFocus={onFocus}
        onInput={props.onInput}
        onKeyDown={props.onKeyDown}
        onKeyPress={props.onKeyPress}
        onKeyUp={props.onKeyUp}
        onMouseDown={props.onMouseDown}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onMouseMove={props.onMouseMove}
        onMouseOut={props.onMouseOut}
        onMouseOver={props.onMouseOver}
        onMouseUp={props.onMouseUp}
        onSelect={props.onSelect}
        onSubmit={props.onSubmit}
        placeholder={placeholder}
        spellCheck={props.spellCheck}
        style={textareaStyle}
        wrap={props.wrap}
        ref={textarea}
      />
      {validationMessage ? (
        <div
          className={`invalid-${
            validatorMessageTypes.includes(props.validatorMessageType)
              ? props.validatorMessageType
              : 'feedback'
          }`}
          aria-live='polite'>
          {validationMessage}
        </div>
      ) : (
        ''
      )}
      {props.labelFloat ? (
        <label
          htmlFor={elementId.current}
          style={labelStyle}
          className='form-label'>
          {props.label}{' '}
          {props.label && props.required ? (
            <span className='text-danger fw-bold'>*</span>
          ) : (
            ''
          )}
        </label>
      ) : (
        ''
      )}
      <div
        ref={hiddenDiv}
        style={hiddenDivStyle}
        tabIndex='-1'
        aria-hidden='true'
        role='presentation'>
        {props.value}
      </div>
    </div>
  )
}

Textarea.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  /** information which may be toggled by clicking a button next to the label */
  info: PropTypes.node,
  /** by default, this will render a bold, monospaced, lowercase i. This button will not be rendered if `info` is falsey. */
  infoBtnContents: PropTypes.node,
  /** value will be rendered inside `<label>` element. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */
  label: PropTypes.node,
  /** use floating label https://getbootstrap.com/docs/5.0/forms/floating-labels/ */
  labelFloat: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  /** prevent the asterisk from appearing in the label when `required` is true */
  noAsterisk: PropTypes.bool,
  /** disable automatic resizing */
  noAutoResize: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  spellCheck: PropTypes.oneOf(['true', 'default', 'false']),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** function which accepts a value and returns an error message or empty string. See the NPM package [@preaction/validation](https://www.npmjs.com/package/@preaction/validation) */
  validator: PropTypes.func,
  validatorMessageType: PropTypes.oneOf(validatorMessageTypes),
  value: PropTypes.string,
  /** callback which accepts a value. Use this to set state. It is triggered by the default `onChange` handler. */
  valueHandler: PropTypes.func,
  wrap: PropTypes.oneOf(['hard', 'soft', 'off'])
}

Textarea.defaultProps = {
  noAutoResize: false,
  validatorMessageType: 'feedback'
}

export { Textarea }
