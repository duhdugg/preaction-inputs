### Input Examples

```jsx
import { Form } from './Form.jsx'
const [name, setName] = React.useState('')
const [email, setEmail] = React.useState('')
const [birthdate, setBirthdate] = React.useState('')
function emailValidator(value) {
  const banList = ['cap@merica.gov']
  let message = ''
  if (banList.indexOf(value) >= 0) {
    message = 'you broke the first rule buddy!'
  }
  return message
}
function birthdateValidator(value) {
  let message = ''
  let date = new Date()
  date.setYear(date.getFullYear() - 21)
  let max = date.toISOString().split('T')[0]
  if (value > max) {
    message = 'You must be 21 or older to enter.'
  }
  return message
}
function getMinimumAge() {
  let birthdate = new Date()
  birthdate.setYear(birthdate.getFullYear() - 21)
  return birthdate.toISOString().split('T')[0]
}
;<Form onSubmit={e => e.preventDefault()}>
  <Input label='Your name' value={name} valueHandler={setName} required />
  <Input
    label='Email'
    type='email'
    value={email}
    valueHandler={setEmail}
    validator={emailValidator}
    required
  />
  <Input
    type='date'
    label='Birthdate'
    max={getMinimumAge()}
    value={birthdate}
    valueHandler={setBirthdate}
    validator={birthdateValidator}
    required
  />
  <button type='submit' className='btn btn-primary'>
    Submit
  </button>
</Form>
```
