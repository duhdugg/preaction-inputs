import PropTypes from 'prop-types'
import React from 'react'

const validatorMessageTypes = ['feedback', 'tooltip']

/**
 * All the elements you need to render an `<input>` in bootstrap
 * @see [Bootstrap Documentation: Forms](https://getbootstrap.com/docs/5.0/forms/overview/)
 * @see [MDN web docs: `<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
 */
function Input(props) {
  const [elementId] = React.useState(
    () => `pxn-input-${+new Date()}-${Math.random()}`
  )
  const [showInfo, setShowInfo] = React.useState(false)
  const inputRef = React.useRef()

  let autoComplete = props.autoComplete
  if (!autoComplete) {
    if (['email', 'tel', 'url'].includes(props.type)) {
      autoComplete = props.type
    } else {
      autoComplete = 'on'
    }
  }

  const inputClass = props.type === 'range' ? 'form-range' : 'form-control'

  let inputMode = 'text'
  if (props.inputMode) {
    inputMode = props.inputMode
  } else {
    switch (props.type) {
      case 'email':
        inputMode = 'email'
        break
      case 'number':
        inputMode = 'numeric'
        break
      case 'tel':
        inputMode = 'tel'
        break
      case 'url':
        inputMode = 'url'
        break
      default:
        inputMode = 'text'
        break
    }
  }

  const labelStyle = {
    cursor: 'pointer',
    position: props.label ? undefined : 'absolute',
    zIndex: props.label ? undefined : '10'
  }

  const placeholder = props.placeholder || (props.labelFloat ? props.label : '')

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const defaultValidator = value => {
    let errorMessage = ''
    if (props.required && !value) {
      errorMessage = 'Please fill out this field.'
    }
    return errorMessage
  }
  const validator = props.validator || defaultValidator

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
    let validationMessage = validator(value)
    inputRef.current.setCustomValidity(validationMessage)
    inputRef.current.checkValidity()
    return validationMessage
  }

  React.useEffect(() => {
    inputRef.current.validate = validate
  })

  const validationMessage = inputRef.current
    ? inputRef.current.validationMessage || validator(inputRef.current.value)
    : validator(props.value)

  return (
    <div
      className={[
        'pxn-input',
        'pxn-input-input',
        props.labelFloat ? 'form-floating' : '',
        props.validatorMessageType === 'tooltip' ? 'position-relative' : ''
      ]
        .filter(x => !!x.length)
        .join(' ')}>
      {props.labelFloat ? (
        ''
      ) : (
        <label htmlFor={elementId} style={labelStyle} className='form-label'>
          {props.label}{' '}
          {props.label && props.required && !props.noAsterisk ? (
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
      <input
        autoComplete={autoComplete}
        className={inputClass}
        disabled={props.disabled}
        id={elementId}
        inputMode={inputMode}
        max={props.max}
        maxLength={props.maxLength}
        min={props.min}
        minLength={props.minLength}
        multiple={props.multiple}
        name={props.name}
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
        onFocus={props.onFocus}
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
        pattern={props.pattern}
        placeholder={placeholder}
        readOnly={props.readOnly}
        ref={inputRef}
        required={props.required}
        spellCheck={props.spellCheck}
        step={props.step}
        tabIndex={props.tabIndex}
        type={props.type}
        value={props.value}
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
        <label htmlFor={elementId} style={labelStyle} className='form-label'>
          {props.label}{' '}
          {props.label && props.required && !props.noAsterisk ? (
            <span className='text-danger fw-bold'>*</span>
          ) : (
            ''
          )}
        </label>
      ) : (
        ''
      )}
    </div>
  )
}

Input.propTypes = {
  /** will default to `on` or `email`, `tel`, or `url`, depending on the `type`.
   * Set to `off` to disable.
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  /** information which may be toggled by clicking a button next to the label */
  info: PropTypes.node,
  /** by default, this will render a bold, monospaced, lowercase i. This button will not be rendered if `info` is falsey. */
  infoBtnContents: PropTypes.node,
  /**
   * if not specified, this will be set to a sane default based on `type`.
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   */
  inputMode: PropTypes.string,
  /** value will be rendered inside `<label>` element. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */
  label: PropTypes.node,
  /** use floating label https://getbootstrap.com/docs/5.0/forms/floating-labels/ */
  labelFloat: PropTypes.bool,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  multiple: PropTypes.bool,
  name: PropTypes.string,
  /** prevent the asterisk from appearing in the label when `required` is true */
  noAsterisk: PropTypes.bool,
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
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  spellCheck: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  /** function which accepts a value and returns an error message or empty string. See the NPM package [@preaction/validation](https://www.npmjs.com/package/@preaction/validation) */
  validator: PropTypes.func,
  validatorMessageType: PropTypes.oneOf(validatorMessageTypes),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** callback which accepts a value. Use this to set state. It is triggered by the default `onChange` handler. */
  valueHandler: PropTypes.func
}

Input.defaultProps = {
  type: 'text',
  validatorMessageType: 'feedback'
}

export { Input }
