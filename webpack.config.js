let path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'preaction-inputs.min.js',
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
