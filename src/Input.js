import React from 'react'

let defaultValidator = value => { return '' }

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.genid()
    this.state = {
      showInfo: false
    }
    this.type = this.props.type || 'text'
    this.toggleInfo = this.toggleInfo.bind(this)
    this.validate = this.validate.bind(this)
    this.onChange = this.onChange.bind(this)
    this.input = React.createRef()
  }

  genid () {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction-input-${now}-${rand}`
    return this.id
  }

  get autoComplete () {
    let retval = this.props.autoComplete
    if (!retval) {
      if (['email', 'tel', 'url'].includes(this.type)) {
        retval = this.type
      } else {
        retval = 'on'
      }
    }
    return retval
  }

  get inputMode () {
    let retval = 'text'
    if (this.props.inputMode) {
      retval = this.props.inputMode
    } else {
      switch (this.type) {
        case 'number':
          retval = 'numeric'
          break
        case 'tel':
          retval = 'tel'
          break
        case 'email':
          retval = 'email'
          break
        case 'url':
          retval = 'url'
          break
        default:
          retval = 'text'
          break
      }
    }
    return retval
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
    return this.input.current ? this.input.current.validationMessage : ''
  }

  get value () {
    let retval = this.props.value || ''
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
      this.props.setValue(this.props.name, event.target.value)
    }
    this.validate(event.target.value)
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
  }

  validate (value) {
    let validationMessage = this.validator(value)
    this.input.current.setCustomValidity(validationMessage)
    this.input.current.checkValidity()
    return validationMessage
  }

  render () {
    return (
      <div className='preaction input form-group' ref={this.element}>
        <label htmlFor={this.id} style={this.labelStyle}>
          {this.props.label}
          {this.props.info
            ? <button type='button' className='btn btn-sm btn-info ml-1 pt-0 pb-0'
              onClick={this.toggleInfo}>
              {this.props.infoBtnContents ||
                <span className='font-weight-bold text-monospace'>i</span>}</button>
            : ''}
        </label>
        {this.props.info && this.state.showInfo
          ? <div className='alert alert-info'
            style={{ fontSize: '0.875rem', padding: '0.875rem' }}
          >{this.props.info}</div>
          : ''}
        <div className='input-group'>
          <input
            type={this.type}
            id={this.id}
            name={this.props.name}
            className='form-control'
            required={this.props.required}
            readOnly={this.props.readOnly}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            disabled={this.props.disabled}
            value={this.value}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            placeholder={this.props.placeholder}
            autoComplete={this.autoComplete}
            inputMode={this.inputMode}
            multiple={this.props.multiple}
            pattern={this.props.pattern}
            spellCheck={this.props.spellCheck}
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
            ref={this.input}
          />
          <div className='invalid-tooltip' aria-live='polite'>{this.validationMessage}</div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.input.current.validate = this.validate
  }
}

export default Input
