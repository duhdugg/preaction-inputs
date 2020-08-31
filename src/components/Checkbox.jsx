import PropTypes from 'prop-types'
import React from 'react'

let defaultValidator = value => {
  return ''
}

/**
 * All the elements you need to render a checkbox in bootstrap
 * @see [Bootstrap Documentation: Input group](https://getbootstrap.com/docs/4.5/components/input-group/)
 * @see [Bootstrap Documentation: Forms](https://getbootstrap.com/docs/4.5/components/forms/)
 * @see [MDN web docs: `<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)
 */
function Checkbox(props) {
  const [elementId] = React.useState(
    () => `preaction-checkbox-${+new Date()}-${Math.random()}`
  )
  const element = React.useRef()
  const input = React.useRef()

  const labelStyle = {
    cursor: 'pointer'
  }

  const inputStyle = {
    cursor: 'pointer'
  }

  const getValidationMessage = () => {
    return input.current ? input.current.validationMessage : ''
  }

  const getValidator = React.useCallback(() => {
    return props.validator || defaultValidator
  }, [props])

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

  const validate = React.useCallback(
    value => {
      let validationMessage = getValidator()(value)
      input.current.setCustomValidity(validationMessage)
      input.current.checkValidity()
      return validationMessage
    },
    [getValidator, input]
  )

  const validationMessage = getValidationMessage()

  return (
    <div className='preaction checkbox form-group' ref={element}>
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
          ref={input}
          required={props.required}
          style={inputStyle}
          tabIndex={props.tabIndex}
          type='checkbox'
        />
        <label
          className='form-check-label'
          htmlFor={elementId}
          style={labelStyle}>
          {props.label}
        </label>
        {validationMessage ? (
          <div className='invalid-tooltip' aria-live='polite'>
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
  validator: PropTypes.func
}

export { Checkbox }
