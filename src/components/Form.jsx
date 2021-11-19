import PropTypes from 'prop-types'
import React from 'react'

/**
 * This isn't much more than a wrapper around a `<form>` element that provides some high-level logic for validation. It is not required to use the other components of this library.
 * @see [Bootstrap Documentation: Forms](https://getbootstrap.com/docs/4.5/components/forms/)
 * @see [MDN web docs: `<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
 */
function Form(props) {
  const [formWasValidated, setFormWasValidated] = React.useState(false)
  const className = ['pxn-input-form', formWasValidated ? 'was-validated' : '']
    .filter(x => !!x.length)
    .join(' ')

  const onReset = event => {
    setFormWasValidated(false)
    if (props.onReset) {
      event.persist()
      props.onReset(event)
    }
  }

  const onSubmit = event => {
    let allValid = true
    let inputElements = Array.from(event.target.getElementsByTagName('input'))
    inputElements.forEach(input => {
      if (input.validate) {
        let value = input.value
        if (input.type === 'checkbox') {
          value = input.checked
        }
        if (input.validate(value)) {
          allValid = false
        }
      }
    })
    let selectElements = Array.from(event.target.getElementsByTagName('select'))
    selectElements.forEach(select => {
      if (select.validate) {
        let value = select.value
        if (select.multiple) {
          value = []
          let options = Array.from(select.options)
          options.forEach(option => {
            if (option.selected) {
              value.push(option.value)
            }
          })
        }
        if (select.validate(value)) {
          allValid = false
        }
      }
    })
    let textareaElements = Array.from(
      event.target.getElementsByTagName('textarea')
    )
    textareaElements.forEach(textarea => {
      if (textarea.validate) {
        if (textarea.validate(textarea.value)) {
          allValid = false
        }
      }
    })
    let wysiwygElements = Array.from(
      event.target.getElementsByClassName('pxn-input-wysiwyg')
    )
    wysiwygElements.forEach(wysiwyg => {
      if (wysiwyg.validate) {
        if (wysiwyg.validate()) {
          allValid = false
        }
      }
    })
    event.target.checkValidity()
    setFormWasValidated(true)
    if (!allValid) {
      event.preventDefault()
      return
    }
    if (props.onSubmit) {
      event.persist()
      props.onSubmit(event)
    }
  }

  return (
    <form
      acceptCharset={props.acceptCharset}
      action={props.action}
      autoComplete={props.autoComplete}
      className={className}
      encType={props.encType}
      method={props.method}
      name={props.name}
      noValidate={props.noValidate}
      onReset={onReset}
      onSubmit={onSubmit}
      target={props.target}>
      {props.children}
    </form>
  )
}

Form.propTypes = {
  acceptCharset: PropTypes.string,
  action: PropTypes.string,
  autoComplete: PropTypes.string,
  children: PropTypes.node,
  encType: PropTypes.string,
  method: PropTypes.string,
  name: PropTypes.string,
  /** skip the browser-default form validation behavior */
  noValidate: PropTypes.bool,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  target: PropTypes.string
}

export { Form }
