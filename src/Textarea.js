import React from 'react'

let defaultValidator = value => { return '' }

class Textarea extends React.Component {
  constructor (props) {
    super(props)
    this.genid()
    this.state = {
      height: 'auto'
    }
    this.validate = this.validate.bind(this)
    this.onChange = this.onChange.bind(this)
    this.hiddenDiv = React.createRef()
    this.textarea = React.createRef()
  }

  genid () {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction textarea-${now}-${rand}`
    return this.id
  }

  get height () {
    return this.state.height
  }

  set height (value) {
    this.setState(state => {
      state.height = value
      return state
    })
  }

  get hiddenDivStyle () {
    return {
      visibility: 'hidden',
      position: 'absolute',
      left: '-0.06em',
      top: '0',
      width: '100%',
      height: 'auto',
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word',
      zIndex: -999
    }
  }

  get labelStyle () {
    return {
      cursor: 'pointer'
    }
  }

  get textareaStyle () {
    let resize = 'none'
    let overflow = 'hidden'
    if (this.props.noAutoResize) {
      resize = 'vertical'
      overflow = 'auto'
    }
    return {
      height: this.height,
      resize,
      overflow
    }
  }

  get validationMessage () {
    return this.textarea.current ? this.textarea.current.validationMessage : ''
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
    this.validate(event.target.value)
    if (this.props.setValue) {
      this.props.setValue(this.props.name, event.target.value)
    }
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
  }

  validate (value) {
    let validationMessage = this.validator(value)
    this.textarea.current.setCustomValidity(validationMessage)
    this.textarea.current.checkValidity()
    return validationMessage
  }

  render () {
    return (
      <div className='preaction textarea form-group'>
        <label htmlFor={this.id} style={this.labelStyle}>{this.props.label}</label>
        <div className='input-group'>
          <div className='form-control' ref={this.hiddenDiv} style={this.hiddenDivStyle}>{this.value}</div>
          <textarea
            id={this.id}
            name={this.props.name}
            className='form-control'
            required={this.props.required}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}
            value={this.value}
            maxLength={this.props.maxLength}
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
            placeholder={this.props.placeholder}
            style={this.textareaStyle}
            wrap={this.props.wrap}
            ref={this.textarea}
          ></textarea>
          <div className='invalid-tooltip' aria-live='polite'>{this.validationMessage}</div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.textarea.current.validate = this.validate
  }

  componentDidUpdate () {
    if (!this.props.noAutoResize) {
      if (this.height !== this.hiddenDiv.current.clientHeight) {
        let height = this.hiddenDiv.current.clientHeight
        if (!this.textarea.current.value) {
          height = height * 3
          if (this.state.height !== height) {
            this.height = height
          }
        } else {
          this.height = height
        }
      }
    }
  }
}

export default Textarea
