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
class Textarea extends React.Component {
  constructor(props) {
    super(props)
    this.genid()
    this.state = {
      height: 'auto',
      pristine: true,
      showInfo: false
    }
    this.onChange = this.onChange.bind(this)
    this.toggleInfo = this.toggleInfo.bind(this)
    this.validate = this.validate.bind(this)
    this.hiddenDiv = React.createRef()
    this.textarea = React.createRef()
  }

  autoResize() {
    if (this.hiddenDiv.current) {
      if (this.height !== this.hiddenDiv.current.clientHeight) {
        let height = this.hiddenDiv.current.clientHeight
        if (!this.textarea.current.value) {
          height = height * 3
          if (!height) {
            // minimum
            height = 16
          }
          if (this.state.height !== height) {
            this.height = height
          }
        } else {
          this.height = height
        }
      }
    }
  }

  genid() {
    let now = +new Date()
    let rand = Math.random()
    this.id = `preaction textarea-${now}-${rand}`
    return this.id
  }

  get height() {
    return this.state.height
  }

  set height(value) {
    this.setState(state => {
      state.height = value
      return state
    })
  }

  get hiddenDivStyle() {
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

  onFocus(e) {
    if (!this.props.noAutoResize) {
      this.autoResize()
    }
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  get textareaStyle() {
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

  toggleInfo() {
    this.setState(state => {
      state.showInfo = !state.showInfo
      return state
    })
  }

  get validationMessage() {
    return this.textarea.current ? this.textarea.current.validationMessage : ''
  }

  get validator() {
    return this.props.validator || defaultValidator
  }

  onChange(event) {
    this.validate(event.target.value)
    if (this.props.onChange) {
      event.persist()
      this.props.onChange(event)
    }
    if (this.props.valueHandler) {
      this.props.valueHandler(event.target.value)
    }
  }

  validate(value) {
    let validationMessage = this.validator(value)
    this.textarea.current.setCustomValidity(validationMessage)
    this.textarea.current.checkValidity()
    return validationMessage
  }

  render() {
    return (
      <div className='preaction textarea form-group'>
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
          <div
            className='form-control'
            ref={this.hiddenDiv}
            style={this.hiddenDivStyle}>
            {this.props.value}
          </div>
          <textarea
            id={this.id}
            name={this.props.name}
            className='form-control'
            required={this.props.required}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}
            value={this.props.value}
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
            onFocus={this.onFocus.bind(this)}
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
          />
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
    this.textarea.current.validate = this.validate
  }

  componentDidUpdate() {
    if (this.state.pristine) {
      this.setState(state => {
        state.pristine = false
        return state
      })
    }
    if (!this.props.noAutoResize) {
      this.autoResize()
    }
  }
}

Textarea.propTypes = {
  disabled: PropTypes.bool,
  /** information which may be toggled by clicking a button next to the label */
  info: PropTypes.node,
  /** by default, this will render a bold, monospaced, lowercase i. This button will not be rendered if `info` is falsey. */
  infoBtnContents: PropTypes.node,
  /** value will be rendered inside `<label>` element. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */
  label: PropTypes.node,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  tabIndex: PropTypes.number,
  /** function which accepts a value and returns an error message or empty string. See the NPM package [@preaction/validation](https://www.npmjs.com/package/@preaction/validation) */
  validator: PropTypes.func,
  value: PropTypes.string,
  /** callback which accepts a value. Use this to set state. It is triggered by the default `onChange` handler. */
  valueHandler: PropTypes.func,
  wrap: PropTypes.string
}

Textarea.defaultProps = {
  noAutoResize: false
}

export { Textarea }
