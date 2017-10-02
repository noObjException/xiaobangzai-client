var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.0.108:80/api"',
  BASE_URL: '"http://192.168.0.108:80"',
  BASE_IMG: '"http://192.168.0.108:80/uploads/"'
})
