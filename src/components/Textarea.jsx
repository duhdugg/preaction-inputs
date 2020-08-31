import PropTypes from 'prop-types'
import React from 'react'

let defaultValidator = value => {
  return ''
}

/**
 * All the elements you need to render a `<textarea>` in bootstrap. By default, it will automatically resize as you type.
 * @see [Bootstrap Documentation: Input group](https://getbootstrap.com/docs/4.5/components/input-group/)
 * @see [Bootstrap Documentation: Forms](https://getbootstrap.com/docs/4.5/components/forms/)
 * @see [MDN web docs: `<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
 */
function Textarea(props) {
  const [elementId] = React.useState(
    () => `preaction-textarea-${+new Date()}-${Math.random()}`
  )
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

  const getHiddenDivStyle = () => {
    return {
      height: 'auto',
      left: '-0.06em',
      overflowWrap: 'break-word',
      position: 'absolute',
      top: '0',
      visibility: 'hidden',
      whiteSpace: 'pre-wrap',
      width: '100%',
      zIndex: -999
    }
  }

  const getLabelStyle = () => {
    let style = {
      cursor: 'pointer'
    }
    if (!props.label) {
      style.position = 'absolute'
      style.zIndex = '10'
    }
    return style
  }

  const onFocus = e => {
    if (!props.noAutoResize) {
      autoResize()
    }
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const getTextareaStyle = () => {
    let resize = 'none'
    let overflow = 'hidden'
    if (props.noAutoResize) {
      resize = 'vertical'
      overflow = 'auto'
    }
    return {
      height,
      resize,
      overflow
    }
  }

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
    <div className='preaction textarea form-group'>
      <label htmlFor={elementId} style={getLabelStyle()}>
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
      <div className='input-group'>
        <div
          className='form-control'
          ref={hiddenDiv}
          style={getHiddenDivStyle()}>
          {props.value}
        </div>
        <textarea
          id={elementId}
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
          placeholder={props.placeholder}
          spellCheck={props.spellCheck}
          style={getTextareaStyle()}
          wrap={props.wrap}
          ref={textarea}
        />
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

Textarea.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  /** information which may be toggled by clicking a button next to the label */
  info: PropTypes.node,
  /** by default, this will render a bold, monospaced, lowercase i. This button will not be rendered if `info` is falsey. */
  infoBtnContents: PropTypes.node,
  /** value will be rendered inside `<label>` element. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */
  label: PropTypes.node,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
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
  value: PropTypes.string,
  /** callback which accepts a value. Use this to set state. It is triggered by the default `onChange` handler. */
  valueHandler: PropTypes.func,
  wrap: PropTypes.oneOf(['hard', 'soft', 'off'])
}

Textarea.defaultProps = {
  noAutoResize: false
}

export { Textarea }
