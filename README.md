# Preaction Inputs

This is a Bootstrap v4 compatible library of React components intended to provide a consistent and responsive experience for most basic user input needs.

It is under active development and the full scope of this project is pending determination.

Components provided by this library include:

- Checkbox
- Form
- Input
- Select
- Textarea
- Wysiwyg (using QuillJS)

## Quick Start

The full documentation can be found in the [styleguide](https://duhdugg.github.io/preaction-inputs/) with live, editable examples.

### Installation

`npm install --save-dev @preaction/inputs`

### Usage

```jsx
// imports must be named, as this alllows shaking unused components from your bundle
import { Form, Input } from '@preaction/inputs'

// bootstrap as a peerDependency means you need to import bootstrap CSS yourself.
// This gives you the flexibility to choose a different build or theme, if you wish.
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [name, setName] = React.useState('')
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Input label='Name' value={name} valueHandler={setName} />
    </Form>
  )
}
```

### License

> Copyright (c) 2018-2020 Doug Elkin
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
