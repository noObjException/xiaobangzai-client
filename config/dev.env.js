var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.1.101/api"',
  BASE_URL: '"http://192.168.1.101"',
  BASE_IMG: '"http://192.168.1.101/uploads/"',
  TEST_OPENID: '"oSdVwwRQoGXAyOvUkondEeZEknok"'
})
