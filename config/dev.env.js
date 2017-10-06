var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://7627d390.ngrok.io/api"',
  BASE_URL: '"https://7627d390.ngrok.io"',
  BASE_IMG: '"https://7627d390.ngrok.io/uploads/"'
})
