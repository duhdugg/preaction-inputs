import PropTypes from 'prop-types'
import React from 'react'

const validatorMessageTypes = ['feedback', 'tooltip']

/**
 * All the elements you need to render a checkbox in bootstrap
 * @see [Bootstrap Documentation: Forms](https://getbootstrap.com/docs/5.0/forms/overview/)
 * @see [MDN web docs: `<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)
 */
function Checkbox(props) {
  const elementId = React.useId()
  const inputRef = React.useRef()

  const pointerStyle = {
    cursor: 'pointer'
  }

  const defaultValidator = value => {
    let errorMessage = ''
    if (props.required && !value) {
      errorMessage = 'Please check this box if you want to proceed.'
    }
    return errorMessage
  }
  const validator = props.validator || defaultValidator

  const onChange = event => {
    validate(event.target.checked)
    if (props.onChange) {
      event.persist()
      props.onChange(event)
    }
    if (props.valueHandler) {
      props.valueHandler(event.target.checked)
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
    ? inputRef.current.validationMessage || validator(inputRef.current.checked)
    : validator(props.checked)

  return (
    <div className='pxn-input pxn-input-checkbox position-relative'>
      <div className='form-check'>
        <input
          checked={props.checked}
          className='form-check-input'
          disabled={props.disabled}
          id={elementId}
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
          onSubmit={props.onSubmit}
          ref={inputRef}
          required={props.required}
          style={pointerStyle}
          tabIndex={props.tabIndex}
          type='checkbox'
        />
        <label
          className='form-check-label'
          htmlFor={elementId}
          style={pointerStyle}>
          {props.label}{' '}
          {props.label && props.required ? (
            <span className='text-danger fw-bold'>*</span>
          ) : (
            ''
          )}
        </label>
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
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.node,
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
  onSubmit: PropTypes.func,
  required: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** callback which accepts a value. Use this to set state. It is triggered by the default `onChange` handler. */
  valueHandler: PropTypes.func,
  /** function which accepts a value and returns an error message or empty string. See the NPM package [@preaction/validation](https://www.npmjs.com/package/@preaction/validation) */
  validator: PropTypes.func,
  validatorMessageType: PropTypes.oneOf(validatorMessageTypes)
}

export { Checkbox }
