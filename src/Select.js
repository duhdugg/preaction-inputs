import React from 'react'
import AsterCheck from './AsterCheck.js'

let defaultValidator = value => { return '' }

class Select extends React.Component {
  constructor (props) {
    super(props)
    this.genid()
    this.state = {
      pristine: true,
      showInfo: false
    }
    this.toggleInfo = this.toggleInfo.bind(this)
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

  toggleInfo () {
    this.setState(state => {
      state.showInfo = !state.showInfo
      return state
    })
  }

  get validationMessage () {
    return this.select.current ? this.select.current.validationMessage : ''
  }

  get value () {
    let retval = this.props.value || ''
    if (this.props.multiple) {
      retval = this.props.value || []
    }
    return retval
  }

  get validator () {
    return this.props.validator || defaultValidator
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
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
    if (this.props.valueHandler) {
      this.props.valueHandler(value)
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
        <label htmlFor={this.id} style={this.labelStyle}>
          {this.props.label}
          {this.props.info
            ? <button type='button' className='btn btn-sm btn-info ml-1 pt-0 pb-0'
              onClick={this.toggleInfo}>
              {this.props.infoBtnContents ||
                <span className='font-weight-bold text-monospace'>i</span>}</button>
            : ''}
          {this.props.required ? <AsterCheck valid={!this.validationMessage && !this.state.pristine} /> : ''}
        </label>
        {this.props.info && this.state.showInfo
          ? <div className='alert alert-info'
            style={{ fontSize: '0.875rem', padding: '0.875rem' }}
          >{this.props.info}</div>
          : ''}
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

  componentDidUpdate () {
    if (this.state.pristine) {
      this.setState(state => {
        state.pristine = false
        return state
      })
    }
  }
}

export default Select
