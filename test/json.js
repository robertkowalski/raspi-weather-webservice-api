// builtins
var assert = require('assert')

// testhelper
var request = require('request')

// settings
var tempdir = __dirname + '/fixtures'

var env = process.env
env.TEMPLOGPATH = tempdir

// main module
var server = require('../app.js')
var url = 'http://127.0.0.1:' + server.port

before(function (done) {
  server(done)
})

describe('api json serving', function () {
  it('serves json with a temperature', function (done) {
    request(url, function (er, res, body) {
      assert.deepEquals(true, false)
      done()
    })
  })
})