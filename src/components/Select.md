### Select Examples

```jsx
const [favoriteSuperHero, setFavoriteSuperHero] = React.useState('')
const superHeroOptions = [
  'bat guy',
  'big green angry guy',
  'iron guy',
  'mean guy',
  'thunder guy'
]
const [favoriteTacoIngredients, setFavoriteTacoIngredients] = React.useState('')
;<Form onSubmit={e => e.preventDefault()} noValidate>
  <Select
    label='Favorite superhero'
    info='You must select one on these options'
    required
    value={favoriteSuperHero}
    valueHandler={setFavoriteSuperHero}>
    <option />
    {superHeroOptions.map(value => (
      <option key={value}>{value}</option>
    ))}
  </Select>
  <Select
    name='ingredients'
    label='Favorite taco ingredients'
    value={favoriteTacoIngredients}
    valueHandler={setFavoriteTacoIngredients}
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
  <button type='submit' className='mt-3 btn btn-primary'>
    Submit
  </button>
</Form>
```
