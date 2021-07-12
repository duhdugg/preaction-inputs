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
const [value, valueHandler] = React.useState(
  '<p><strong><em>Howdy</em></strong><em>, strangers!</em></p>'
)
;<div>
  <Wysiwyg
    label='Wysiwyg (top toolbar)'
    value={value}
    valueHandler={valueHandler}
  />
  <Wysiwyg
    label='Wysiwyg (hidden toolbar)'
    info='try typing some text, and then selecting it to get the toolbar to appear'
    value={value}
    valueHandler={valueHandler}
    theme='bubble'
  />
  <Textarea label='HTML' value={value} readOnly />
</div>
```
