# Preaction Inputs

This is a Bootstrap v4 compatible library of React components intended to provide a consistent and responsive experience for most basic user input needs.

This is currently under active development, so the best way to learn about how it's used is to review the [code on GitLab](https://gitlab.com/drelyn86/preaction-inputs/blob/master/src/App.js).

## Usage

### dependencies

```bash
yarn add preaction-inputs

# or...
npm install --save preaction-inputs
```

### example use

```javascript
import React from 'react'
import {
  Checkbox,
  Form,
  Input,
  Select,
  Textarea,
  Wysiwyg
} from 'preaction-inputs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input1: ''
    }
  }

  render() {
    return <div className="App">
      <form onSubmit>
      </form>
    </App>
  }
}

export default App
```
