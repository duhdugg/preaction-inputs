import PropTypes from 'prop-types'
import React from 'react'
import AsterCheck from './AsterCheck.jsx'

let defaultValidator = value => {
  return ''
}

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.genid()
    this.state = { pristine: true }
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.element = React.createRef()
    this.input = React.createRef()
  }

  genid() {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction-checkbox-${now}-${rand}`
    return this.id
  }

  get labelStyle() {
    return {
      cursor: 'pointer'
    }
  }

  get inputStyle() {
    return {
      cursor: 'pointer'
    }
  }

  get validationMessage() {
    return this.input.current ? this.input.current.validationMessage : ''
  }

  get validator() {
    return this.props.validator || defaultValidator
  }

  onChange(event) {
    this.validate()
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
    if (this.props.valueHandler) {
      this.props.valueHandler(event.target.checked)
    }
  }

  validate() {
    let validationMessage = this.validator(this.value)
    this.input.current.setCustomValidity(validationMessage)
    this.input.current.checkValidity()
    return validationMessage
  }

  render() {
    return (
      <div className='preaction checkbox form-group' ref={this.element}>
        <div className='form-check'>
          <input
            checked={this.props.checked}
            className='form-check-input'
            disabled={this.props.disabled}
            id={this.id}
            name={this.props.name}
            onBlur={this.props.onBlur}
            onChange={this.onChange}
            onClick={this.props.onClick}
            onContextMenu={this.props.onContextMenu}
            onDoubleClick={this.props.onDoubleClick}
            onDrag={this.props.onDrag}
            onDragEnd={this.props.onDragEnd}
            onDragEnter={this.props.onDragEnter}
            onDragLeave={this.props.onDragLeave}
            onDragOver={this.props.onDragOver}
            onDragStart={this.props.onDragStart}
            onDrop={this.props.onDrop}
            onFocus={this.props.onFocus}
            onInput={this.props.onInput}
            onKeyDown={this.props.onKeyDown}
            onKeyPress={this.props.onKeyPress}
            onKeyUp={this.props.onKeyUp}
            onMouseDown={this.props.onMouseDown}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            onMouseMove={this.props.onMouseMove}
            onMouseOut={this.props.onMouseOut}
            onMouseOver={this.props.onMouseOver}
            onMouseUp={this.props.onMouseUp}
            onSelect={this.props.onSelect}
            onSubmit={this.props.onSubmit}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            ref={this.input}
            required={this.props.required}
            style={this.inputStyle}
            tabIndex={this.props.tabIndex}
            type='checkbox'
          />
          <label
            className='form-check-label'
            htmlFor={this.id}
            style={this.labelStyle}>
            {this.props.label}
            {this.props.required ? (
              <AsterCheck
                noCheck
                valid={!this.validationMessage && !this.state.pristine}
              />
            ) : (
              ''
            )}
          </label>
          {this.validationMessage ? (
            <div className='invalid-tooltip' aria-live='polite'>
              {this.validationMessage}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.element.current.validate = this.validate
  }

  componentDidUpdate() {
    if (this.state.pristine) {
      this.setState(state => {
        state.pristine = false
        return state
      })
    }
  }
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
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tabIndex: PropTypes.number,
  valueHandler: PropTypes.func,
  validator: PropTypes.func
}

export default Checkbox
