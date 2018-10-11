import React from 'react'

let defaultValidator = value => { return '' }

class Select extends React.Component {
  constructor (props) {
    super(props)
    this.genid()
    this.validate = this.validate.bind(this)
    this.onChange = this.onChange.bind(this)
    this.select = React.createRef()
  }

  genid () {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction-select-${now}-${rand}`
    return this.id
  }

  get labelStyle () {
    return {
      cursor: 'pointer'
    }
  }

  get validationMessage () {
    return this.select.current ? this.select.current.validationMessage : ''
  }

  get value () {
    let retval = this.props.value || ''
    if (this.props.multiple) {
      retval = this.props.value || []
    }
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
    let value = event.target.value
    if (this.props.multiple) {
      value = []
      for (let option of this.select.current.options) {
        if (option.selected) {
          value.push(option.value)
        }
      }
    }
    this.validate()
    if (this.props.setValue) {
      this.props.setValue(this.props.name, value)
    }
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
  }

  validate () {
    let validationMessage = this.validator(this.value)
    this.select.current.setCustomValidity(validationMessage)
    this.select.current.checkValidity()
    return validationMessage
  }

  render () {
    return (
      <div className='preaction select form-group' ref={this.element}>
        <label htmlFor={this.id} style={this.labelStyle}>{this.props.label}</label>
        <div className='input-group'>
          <select
            id={this.id}
            name={this.props.name}
            className='form-control'
            required={this.props.required}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}
            value={this.value}
            multiple={this.props.multiple}
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
            ref={this.select}
          >
            {this.props.children}
          </select>
          <div className='invalid-tooltip' aria-live='polite'>{this.validationMessage}</div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.select.current.validate = this.validate
  }
}

export default Select
