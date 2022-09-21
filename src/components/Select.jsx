import PropTypes from 'prop-types'
import React from 'react'

const validatorMessageTypes = ['feedback', 'tooltip']

/**
 * All the elements you need to render a `<select>` in bootstrap
 * @see [Bootstrap Documentation: Forms](https://getbootstrap.com/docs/5.0/forms/overview/)
 * @see [MDN web docs: `<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
 */
function Select(props) {
  const elementId = React.useId()
  const [showInfo, setShowInfo] = React.useState(false)
  const select = React.useRef()

  const labelStyle = {
    cursor: 'pointer',
    position: props.label ? undefined : 'absolute',
    zIndex: props.label ? undefined : '10'
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const getValidationMessage = () => {
    return select.current ? select.current.validationMessage : ''
  }

  const getValue = () => {
    let retval = props.value || ''
    if (props.multiple) {
      retval = props.value || []
    }
    return retval
  }

  const defaultValidator = value => {
    let errorMessage = ''
    if (props.required && !value) {
      errorMessage = 'Please select an item in the list.'
    }
    return errorMessage
  }
  const validator = props.validator || defaultValidator

  const onChange = event => {
    let value = event.target.value
    if (props.multiple) {
      value = []
      const options = Array.from(select.current.options)
      options.forEach(option => {
        if (option.selected) {
          value.push(option.value)
        }
      })
    }
    validate(event.target.value)
    if (props.onChange) {
      event.persist()
      props.onChange(event)
    }
    if (props.valueHandler) {
      props.valueHandler(value)
    }
  }

  const validate = value => {
    const validationMessage = validator(value)
    select.current.setCustomValidity(validationMessage)
    select.current.checkValidity()
    return validationMessage
  }

  React.useEffect(() => {
    select.current.validate = validate
  })

  const validationMessage = getValidationMessage()
  const value = getValue()

  return (
    <div
      className={[
        'pxn-input',
        'pxn-input-select',
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
              className='btn btn-sm btn-info ms-1 pt-0 pb-0'
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
      <select
        className='form-control'
        disabled={props.disabled}
        id={elementId}
        autoComplete={props.autoComplete}
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
        readOnly={props.readOnly}
        ref={select}
        required={props.required}
        tabIndex={props.tabIndex}
        value={value}>
        {props.children}
      </select>
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

Select.propTypes = {
  autoComplete: PropTypes.string,
  /** `<option>` and/or `<optgroup>` elements need to be passed as children to this component */
  children: PropTypes.node,
  disabled: PropTypes.bool,
  /** information which may be toggled by clicking a button next to the label */
  info: PropTypes.node,
  /** by default, this will render a bold, monospaced, lowercase i. This button will not be rendered if `info` is falsey. */
  infoBtnContents: PropTypes.node,
  /** value will be rendered inside `<label>` element. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */
  label: PropTypes.node,
  /** use floating label https://getbootstrap.com/docs/5.0/forms/floating-labels/ */
  labelFloat: PropTypes.bool,
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
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** function which accepts a value and returns an error message or empty string. See the NPM package [@preaction/validation](https://www.npmjs.com/package/@preaction/validation) */
  validator: PropTypes.func,
  validatorMessageType: PropTypes.oneOf(validatorMessageTypes),
  /** use an array when `multiple` is `true` */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  /** callback which accepts a value. Use this to set state. It is triggered by the default `onChange` handler. */
  valueHandler: PropTypes.func
}

Select.defaultProps = {
  validatorMessageType: 'feedback'
}

export { Select }
