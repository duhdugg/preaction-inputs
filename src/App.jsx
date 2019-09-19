import React from 'react'
import Examples from './Examples.jsx'

class App extends React.Component {
  get year() {
    return new Date().getFullYear()
  }
  render() {
    return (
      <div className='App'>
        <Examples />
      </div>
    )
  }
}

export default App
