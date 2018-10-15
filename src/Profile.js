import React from 'react'
import Checkbox from './Checkbox.js'
import Input from './Input.js'
import Form from './Form.js'
import Select from './Select.js'
import Textarea from './Textarea.js'
import Wysiwyg from './Wysiwyg.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      birthdate: '',
      favoriteComic: '',
      favoriteTacoToppings: '',
      aboutYou: '',
      bio: '',
      confirm: false
    }
  }

  getValidator (key) {
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
      }
    }[key]
  }

  getValueHandler (key) {
    return value => {
      this.setState(state => {
        state[key] = value
        return state
      })
    }
  }

  get minimumAge () {
    let birthdate = new Date()
    birthdate.setYear(birthdate.getFullYear() - 21)
    return birthdate.toISOString().split('T')[0]
  }

  onSubmit (event) {
    event.preventDefault()
    console.debug(event.target.checkValidity())
  }

  render () {
    return (
      <div className="Profile container col-sm-6">
        <Form onSubmit={this.onSubmit.bind(this)} noValidate>
          <Input
            label="Your name"
            value={this.state.name}
            valueHandler={this.getValueHandler.bind(this)('name')}
            required
          />
          <Input
            type="date"
            label="Birthdate"
            max={this.minimumAge}
            value={this.state.birthdate}
            valueHandler={this.getValueHandler.bind(this)('birthdate')}
            validator={this.getValidator('birthdate')}
            required
          />
          <Select
            label="Favorite comic series"
            info="You can just pick one"
            required
            value={this.state.favoriteComic}
            valueHandler={this.getValueHandler.bind(this)('favoriteComic')}
          >
            <option />
            <option>DC</option>
            <option>Marvel</option>
          </Select>
          <Select
            label="Favorite taco toppings"
            value={this.state.favoriteTacoToppings}
            valueHandler={this.getValueHandler.bind(this)(
              'favoriteTacoToppings'
            )}
            multiple
            required
          >
            <option>meat</option>
            <option>cheese</option>
            <option>beans</option>
            <option>tomatoes</option>
          </Select>
          <Textarea
            label="Why you want to join our club?"
            required
            value={this.state.aboutYou}
            valueHandler={this.getValueHandler.bind(this)('aboutYou')}
          />
          <Wysiwyg
            label="Bio"
            value={this.state.bio}
            valueHandler={this.getValueHandler.bind(this)('bio')}
          />
          <Checkbox
            label="I understand"
            value={this.state.confirm}
            valueHandler={this.getValueHandler.bind(this)('confirm')}
            required
          />
          <input type="submit" className="btn btn-primary" />
        </Form>
      </div>
    )
  }
}

export default Profile
