# Preaction Inputs

This is a Bootstrap v4 compatible library of React components intended to provide a consistent and responsive experience for most basic user input needs.

## Usage

### install dependencies

```bash
yarn add @preaction/inputs

# or...
npm install --save @preaction/inputs
```

### example

```jsx
import React from 'react'
import {
  Checkbox,
  Form,
  Input,
  Select,
  Textarea,
  Wysiwyg
} from '@preaction/inputs'

// Bootstrap should be imported somehow in your app for ideal styling.
// It is not listed in peerDependencies because it's optional
// In this example, we already have it installed in node_modules.
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutYou: '',
      bio: '',
      birthdate: '',
      confirm: false,
      email: '',
      favoriteSuperHero: '',
      favoriteTacoIngredients: '',
      name: ''
    }
  }

  getValidator(key) {
    // returns a custom validator
    // validator should be a function that takes a single value argument
    // and returns an string to indicate an error
    // or an empty string for valid input
    return {
      birthdate: value => {
        let message = ''
        let date = new Date()
        date.setYear(date.getFullYear() - 21)
        let max = date.toISOString().split('T')[0]
        if (value > max) {
          message = 'You must be 21 or older to enter.'
        }
        return message
      },
      email: value => {
        const banList = ['cap@merica.gov']
        let message = ''
        if (banList.indexOf(value) >= 0) {
          message = 'you broke the first rule buddy!'
        }
        return message
      }
    }[key]
  }

  getValueHandler(key) {
    // returns a value handler for state binding
    return value => {
      this.setState(state => {
        state[key] = value
        return state
      })
    }
  }

  get superHeroOptions() {
    return [
      'bat guy',
      'big green angry guy',
      'iron guy',
      'mean guy',
      'thunder guy'
    ]
  }

  get minimumAge() {
    let birthdate = new Date()
    birthdate.setYear(birthdate.getFullYear() - 21)
    return birthdate.toISOString().split('T')[0]
  }

  onSubmit(event) {
    event.preventDefault()
    console.debug(event.target.checkValidity())
  }

  render() {
    return (
      <div className='Profile container col-sm-6'>
        <p className='display-4'>Registration Form</p>
        <Form onSubmit={this.onSubmit.bind(this)} noValidate>
          <Input
            label='Your name'
            value={this.state.name}
            valueHandler={this.getValueHandler.bind(this)('name')}
            required
          />
          <Input
            label='Email'
            type='email'
            value={this.state.email}
            valueHandler={this.getValueHandler.bind(this)('email')}
            validator={this.getValidator('email')}
            required
          />
          <Input
            type='date'
            label='Birthdate'
            max={this.minimumAge}
            value={this.state.birthdate}
            valueHandler={this.getValueHandler.bind(this)('birthdate')}
            validator={this.getValidator('birthdate')}
            required
          />
          <Select
            label='Favorite superhero'
            info='You must select one on these options'
            required
            value={this.state.favoriteSuperHero}
            valueHandler={this.getValueHandler.bind(this)('favoriteSuperHero')}>
            <option />
            {this.superHeroOptions.map(value => (
              <option key={value}>{value}</option>
            ))}
          </Select>
          <Select
            label='Favorite taco ingredients'
            value={this.state.favoriteTacoIngredients}
            valueHandler={this.getValueHandler.bind(this)(
              'favoriteTacoIngredients'
            )}
            multiple
            required>
            <option>beans</option>
            <option>cheese</option>
            <option>guacamole</option>
            <option>hot sauce</option>
            <option>lettuce</option>
            <option>meat</option>
            <option>mushrooms</option>
            <option>peppers</option>
            <option>shells</option>
            <option>sour cream</option>
          </Select>
          <Textarea
            label='Why do you want to join?'
            required
            value={this.state.aboutYou}
            valueHandler={this.getValueHandler.bind(this)('aboutYou')}
          />
          <Wysiwyg
            label='Bio'
            value={this.state.bio}
            valueHandler={this.getValueHandler.bind(this)('bio')}
          />
          <Checkbox
            label='I understand the first rule of this club'
            value={this.state.confirm}
            valueHandler={this.getValueHandler.bind(this)('confirm')}
            required
          />
          <input type='submit' className='btn btn-primary' />
        </Form>
      </div>
    )
  }
}

export default Profile
```

[More Examples](https://gitlab.com/dougelkin/preaction-inputs/blob/master/src/Examples.jsx)
