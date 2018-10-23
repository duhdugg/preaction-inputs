import React from 'react'
import AsterCheck from './AsterCheck.js'

let defaultValidator = value => {
  return ''
}

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.genid()
    this.state = {
      pristine: true,
      showInfo: false
    }
    this.type = this.props.type || 'text'
    this.onChange = this.onChange.bind(this)
    this.toggleInfo = this.toggleInfo.bind(this)
    this.validate = this.validate.bind(this)
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
        case 'email':
          retval = 'email'
          break
        case 'number':
          retval = 'numeric'
          break
        case 'tel':
          retval = 'tel'
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
    let style = {
      cursor: 'pointer'
    }
    if (!this.props.label) {
      style.position = 'absolute'
      style.zIndex = '10'
    }
    return style
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

  get validator () {
    return this.props.validator || defaultValidator
  }

  onChange (event) {
    this.dirty()
    this.validate(event.target.value)
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
    if (this.props.valueHandler) {
      this.props.valueHandler(event.target.value)
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
      <div className="preaction input form-group" ref={this.element}>
        <label htmlFor={this.id} style={this.labelStyle}>
          {this.props.label}
          {this.props.info ? (
            <button
              type="button"
              className="btn btn-sm btn-info ml-1 pt-0 pb-0"
              onClick={this.toggleInfo}
            >
              {this.props.infoBtnContents || (
                <span className="font-weight-bold text-monospace">i</span>
              )}
            </button>
          ) : (
            ''
          )}
          {this.props.required ? (
            <AsterCheck
              valid={!this.validationMessage && !this.state.pristine}
            />
          ) : (
            ''
          )}
        </label>
        {this.props.info && this.state.showInfo ? (
          <div
            className="alert alert-info"
            style={{ fontSize: '0.875rem', padding: '0.875rem' }}
          >
            {this.props.info}
          </div>
        ) : (
          ''
        )}
        <div className="input-group">
          <input
            autoComplete={this.autoComplete}
            className="form-control"
            disabled={this.props.disabled}
            id={this.id}
            inputMode={this.inputMode}
            max={this.props.max}
            maxLength={this.props.maxLength}
            min={this.props.min}
            minLength={this.props.minLength}
            multiple={this.props.multiple}
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
            pattern={this.props.pattern}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            ref={this.input}
            required={this.props.required}
            spellCheck={this.props.spellCheck}
            step={this.props.step}
            tabIndex={this.props.tabIndex}
            type={this.type}
            value={this.props.value}
          />
          {this.validationMessage ? (
            <div className="invalid-tooltip" aria-live="polite">
              {this.validationMessage}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.input.current.validate = this.validate
  }

  componentDidUpdate () {
    this.dirty()
  }

  dirty () {
    if (this.state.pristine) {
      this.setState(state => {
        state.pristine = false
        return state
      })
    }
  }
}

export default Input
