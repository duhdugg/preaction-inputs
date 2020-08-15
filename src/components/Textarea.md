### Textarea Example

```jsx
const [aboutYou, setAboutYou] = React.useState('')
;<Textarea
  label='Why do you want to join?'
  required
  value={aboutYou}
  valueHandler={setAboutYou}
/>
```
