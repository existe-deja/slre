// vue.config.js
module.exports = {
  devServer: {
    host: "localhost"
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}
