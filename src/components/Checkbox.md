### Checkbox Example

```jsx
let [confirm, setConfirm] = React.useState(false)
;<Checkbox
  label='I understand the first rule of this club'
  checked={confirm}
  valueHandler={setConfirm}
  required
/>
```
