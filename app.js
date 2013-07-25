var http = require('http')
var fs = require('fs')
var glob = require('glob')
var tsr = require('temperature-stream')

var env = process.env
var port = env.PORT || 1338

module.exports = serveApi
function serveApi (cb) {
  throw new Error('Not implemented')
}

serveApi.port = port