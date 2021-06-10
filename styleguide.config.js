const path = require('path')
module.exports = {
  require: [path.resolve(__dirname, 'styleguide.imports.js')],
  sections: [
    { name: 'Introduction', content: 'docs/introduction.md' },
    { name: 'Getting Started', content: 'docs/getting-started.md' },
    { name: 'Components', components: 'src/components/*.jsx' }
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/react-quill@1.3.5/dist/quill.snow.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/react-quill@1.3.5/dist/quill.bubble.css'
        }
      ]
    }
  },
  exampleMode: 'expand',
  usageMode: 'expand'
}
