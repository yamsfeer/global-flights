const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[name].[hash:5].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'src/config/index.js'),
      scene: path.resolve(__dirname, 'src/scene'),
      objects: path.resolve(__dirname, 'src/objects'),
      resource: path.resolve(__dirname, 'src/resource'),
      tools: path.resolve(__dirname, 'src/tools'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
  ]
}