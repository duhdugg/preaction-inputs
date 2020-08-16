### Form Example

```jsx
const [name, setName] = React.useState('')
;<Form
  onSubmit={e => {
    e.preventDefault()
    alert('Form submitted')
  }}>
  <Input value={name} valueHandler={setName} placeholder='Name' required />
  <button type='submit' className='btn btn-primary'>
    Submit
  </button>
</Form>
```
