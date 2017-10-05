var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://8d21c560.ngrok.io/api"',
  BASE_URL: '"http://8d21c560.ngrok.io"',
  BASE_IMG: '"http://8d21c560.ngrok.iouploads/"'
})
