process.env.SUPPRESS_NO_CONFIG_WARNING = true

require('babel-register')(require('./.babel-config'))
require('./app')
