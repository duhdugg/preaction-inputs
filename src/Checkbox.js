import React from 'react'

let defaultValidator = value => { return '' }

class Checkbox extends React.Component {
  constructor (props) {
    super(props)
    this.genid()
    this.validate = this.validate.bind(this)
    this.onChange = this.onChange.bind(this)
    this.element = React.createRef()
    this.input = React.createRef()
  }

  genid () {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction-checkbox-${now}-${rand}`
    return this.id
  }

  get labelStyle () {
    return {
      cursor: 'pointer'
    }
  }

  get inputStyle () {
    return {
      cursor: 'pointer'
    }
  }

  get validationMessage () {
    return this.input.current ? this.input.current.validationMessage : ''
  }

  get value () {
    let retval = this.props.checked || false
    if (this.props.getValue) {
      retval = this.props.getValue(this.props.name)
    }
    return retval
  }

  get validator () {
    let validator = defaultValidator
    if (this.props.getValidator) {
      validator = this.props.getValidator(this.props.name) || defaultValidator
    }
    return validator
  }

  onChange (event) {
    if (this.props.setValue) {
      this.props.setValue(this.props.name, event.target.checked)
    }
    this.validate()
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
  }

  validate () {
    let validationMessage = this.validator(this.value)
    this.input.current.setCustomValidity(validationMessage)
    this.input.current.checkValidity()
    return validationMessage
  }

  render () {
    return (
      <div className='preaction checkbox form-group' ref={this.element}>
        <div className='form-check'>
          <input
            type='checkbox'
            id={this.id}
            name={this.props.name}
            className='form-check-input'
            required={this.props.required}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}
            checked={this.value}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
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
            style={this.inputStyle}
            ref={this.input}
          />
          <label className='form-check-label' htmlFor={this.id} style={this.labelStyle}>
            {this.props.label}
          </label>
          <div className='invalid-tooltip' aria-live='polite'>{this.validationMessage}</div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.element.current.validate = this.validate
  }
}

export default Checkbox
