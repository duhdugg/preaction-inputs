import PropTypes from 'prop-types'
import React from 'react'
import AsterCheck from './AsterCheck.jsx'

let defaultValidator = value => {
  return ''
}

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.genid()
    this.state = {
      pristine: true,
      showInfo: false
    }
    this.onChange = this.onChange.bind(this)
    this.select = React.createRef()
    this.toggleInfo = this.toggleInfo.bind(this)
    this.validate = this.validate.bind(this)
  }

  genid() {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction-select-${now}-${rand}`
    return this.id
  }

  get labelStyle() {
    let style = {
      cursor: 'pointer'
    }
    if (!this.props.label) {
      style.position = 'absolute'
      style.zIndex = '10'
    }
    return style
  }

  toggleInfo() {
    this.setState(state => {
      state.showInfo = !state.showInfo
      return state
    })
  }

  get validationMessage() {
    return this.select.current ? this.select.current.validationMessage : ''
  }

  get value() {
    let retval = this.props.value || ''
    if (this.props.multiple) {
      retval = this.props.value || []
    }
    return retval
  }

  get validator() {
    return this.props.validator || defaultValidator
  }

  onChange(event) {
    let value = event.target.value
    if (this.props.multiple) {
      value = []
      let options = Array.from(this.select.current.options)
      options.forEach(option => {
        if (option.selected) {
          value.push(option.value)
        }
      })
    }
    this.dirty()
    this.validate()
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
    if (this.props.valueHandler) {
      this.props.valueHandler(value)
    }
  }

  validate() {
    let validationMessage = this.validator(this.value)
    this.select.current.setCustomValidity(validationMessage)
    this.select.current.checkValidity()
    return validationMessage
  }

  render() {
    return (
      <div className='preaction select form-group' ref={this.element}>
        <label htmlFor={this.id} style={this.labelStyle}>
          {this.props.label}
          {this.props.info ? (
            <button
              type='button'
              className='btn btn-sm btn-info ml-1 pt-0 pb-0'
              onClick={this.toggleInfo}>
              {this.props.infoBtnContents || (
                <span className='font-weight-bold text-monospace'>i</span>
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
            className='alert alert-info'
            style={{ fontSize: '0.875rem', padding: '0.875rem' }}>
            {this.props.info}
          </div>
        ) : (
          ''
        )}
        <div className='input-group'>
          <select
            className='form-control'
            disabled={this.props.disabled}
            id={this.id}
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
            readOnly={this.props.readOnly}
            ref={this.select}
            required={this.props.required}
            tabIndex={this.props.tabIndex}
            value={this.value}>
            {this.props.children}
          </select>
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
    this.select.current.validate = this.validate
  }

  componentDidUpdate() {
    this.dirty()
  }

  dirty() {
    if (this.state.pristine) {
      this.setState(state => {
        state.pristine = false
        return state
      })
    }
  }
}

Select.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  info: PropTypes.node,
  infoBtnContents: PropTypes.node,
  label: PropTypes.node,
  multiple: PropTypes.bool,
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
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tabIndex: PropTypes.number,
  validator: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  valueHandler: PropTypes.func
}

export default Select
