### Input Examples

```jsx
const [name, setName] = React.useState('')
const [email, setEmail] = React.useState('')
const [birthdate, setBirthdate] = React.useState('')
const [commitment, setCommitment] = React.useState('1')
function emailValidator(value) {
  const banList = ['cap@merica.gov']
  let message = ''
  if (!value) {
    message = 'Please fill out this field.'
  }
  if (banList.includes(value)) {
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
;<Form onSubmit={e => e.preventDefault()} noValidate>
  <Input
    label='Name'
    value={name}
    valueHandler={setName}
    validatorMessageType='tooltip'
    required
  />
  <Input
    label='Email'
    required
    labelFloat
    type='email'
    value={email}
    valueHandler={setEmail}
    validator={emailValidator}
  />
  <Input
    type='date'
    label='Birthdate'
    labelFloat
    max={getMinimumAge()}
    value={birthdate}
    valueHandler={setBirthdate}
    validator={birthdateValidator}
  />
  <Input
    label='Commitment Level'
    type='range'
    min='1'
    max='5'
    value={commitment}
    valueHandler={setCommitment}
  />
  <Input
    type='number'
    min='1'
    max='5'
    value={commitment}
    valueHandler={setCommitment}
  />
  <button type='submit' className='mt-3 btn btn-primary'>
    Submit
  </button>
</Form>
```
