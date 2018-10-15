import React from 'react'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formWasValidated: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  get className () {
    let retval = 'preaction form'
    if (this.state.formWasValidated) {
      retval += ' was-validated'
    }
    return retval
  }

  onReset (event) {
    this.setState(state => {
      state.formWasValidated = false
      return state
    })
    if (this.props.onReset) {
      event.persist()
      this.props.onReset(event)
    }
  }

  onSubmit (event) {
    for (let input of event.target.getElementsByTagName('input')) {
      if (input.validate) {
        let value = input.value
        if (input.type === 'checkbox') {
          value = input.checked
        }
        input.validate(value)
      }
    }
    for (let select of event.target.getElementsByTagName('select')) {
      if (select.validate) {
        let value = select.value
        if (select.multiple) {
          value = []
          for (let option of select.options) {
            if (option.selected) {
              value.push(option.value)
            }
          }
        }
        select.validate(value)
      }
    }
    for (let textarea of event.target.getElementsByTagName('textarea')) {
      if (textarea.validate) {
        textarea.validate(textarea.value)
      }
    }
    event.target.checkValidity()
    this.setState(state => {
      state.formWasValidated = true
      return state
    })
    if (this.props.onSubmit) {
      event.persist()
      this.props.onSubmit(event)
    }
  }

  render () {
    return (
      <form
        acceptCharset={this.props.acceptCharset}
        action={this.props.action}
        autoComplete={this.props.autoComplete}
        className={this.className}
        encType={this.props.endType}
        method={this.props.method}
        name={this.props.name}
        noValidate={this.props.noValidate}
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        target={this.props.target}
      >
        {this.props.children}
      </form>
    )
  }
}

export default Form
