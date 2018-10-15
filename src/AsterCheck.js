import React from 'react'

class AsterCheck extends React.Component {
  get className () {
    let classes = ['font-weight-bold text-mongospace ml-1']
    if (this.props.valid) {
      classes.push('text-success')
    } else {
      classes.push('text-danger')
    }
    return classes.join(' ')
  }

  get char () {
    let char = '*'
    if (this.props.valid) {
      if (this.props.noCheck) {
        char = ''
      } else {
        char = '✓'
      }
    }
    return char
  }

  render () {
    return <small className={this.className}>{this.char}</small>
  }
}

export default AsterCheck
