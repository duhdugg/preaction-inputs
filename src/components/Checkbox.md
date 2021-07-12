### Checkbox Example

```jsx
let [confirm, setConfirm] = React.useState(false)
;<Form onSubmit={e => e.preventDefault()} noValidate>
  <Checkbox
    label='I understand the first rule of this club'
    checked={confirm}
    valueHandler={setConfirm}
    required
  />
  <button type='submit' className='mt-3 btn btn-primary'>
    Submit
  </button>
</Form>
```
