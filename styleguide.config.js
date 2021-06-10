const path = require('path')
const pkg = require('./package.json')
module.exports = {
  require: [path.resolve(__dirname, 'styleguide.imports.js')],
  styleguideDir: 'styleguide/v3',
  version: pkg.version,
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
          href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/react-quill@1.3.3/dist/quill.bubble.css'
        }
      ]
    }
  },
  exampleMode: 'expand',
  usageMode: 'expand'
}
