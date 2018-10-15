let path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    Form: './src/Form.js',
    Checkbox: './src/Checkbox.js',
    Input: './src/Input.js',
    Select: './src/Select.js',
    Textarea: './src/Textarea.js',
    Wysiwyg: './src/Wysiwyg.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].dist.js',
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
    ]
  }
}
