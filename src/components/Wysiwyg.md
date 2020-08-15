### Wysiwyg default toolbar and modules

```
{
  toolbar: [
    [{ header: [] }, { font: [] }],
    ['code', 'bold', 'italic', 'strike'],
    [{ color: [] }, { background: [] }],
    [
      'blockquote',
      { indent: '-1' },
      { indent: '+1' },
      { list: 'bullet' },
      { list: 'ordered' },
      'code-block'
    ],
    ['link', 'image', 'video']
  ]
}
<div><a href="https://quilljs.com/docs/modules/">Quill Documentation: Modules</a> | <a href="https://quilljs.com/docs/modules/toolbar/">Quill Documentation: Toolbar Module</a></div>
```

### Wysiwyg Examples

```jsx
const [bio, setBio] = React.useState('')
;<div>
  <Wysiwyg label='Wysiwyg (top toolbar)' value={bio} valueHandler={setBio} />
  <Wysiwyg
    label='Wysiwyg (hidden toolbar)'
    info='try typing some text, and then selecting it to get the toolbar to appear'
    value={bio}
    valueHandler={setBio}
    theme='bubble'
  />
</div>
```
