### Textarea Example

```jsx
const [aboutYou, setAboutYou] = React.useState('')
;<Form onSubmit={e => e.preventDefault()} noValidate>
  <Textarea
    label='Why do you want to join?'
    required
    value={aboutYou}
    valueHandler={setAboutYou}
  />
  <button type='submit' className='mt-3 btn btn-primary'>
    Submit
  </button>
</Form>
```
