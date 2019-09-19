let path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    all: './index.js',
    checkbox: './src/Checkbox.jsx',
    form: './src/Form.jsx',
    input: './src/Input.jsx',
    select: './src/Select.jsx',
    textarea: './src/Textarea.jsx',
    wysiwyg: './src/Wysiwyg.jsx'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'preaction-inputs.[name].min.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|\.test\.js)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
    noParse: /node_modules\/quill\/dist/
  }
}
