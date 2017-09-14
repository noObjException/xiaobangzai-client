var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.1.3:83/api"',
  BASE_URL: '"http://192.168.1.3:83"',
  BASE_IMG: '"http://192.168.1.3:83/uploads/"'
})
