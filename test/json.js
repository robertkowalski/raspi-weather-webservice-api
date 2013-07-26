// builtins
var assert = require('assert')

// testhelper
var request = require('request')

// settings
var fixtures = __dirname + '/fixtures/'

var env = process.env
env.FILE = fixtures + 'input.txt'

// main module
var server = require('../app.js')
var url = 'http://127.0.0.1:' + server.port

before(function (done) {
  server(done)
})

describe('api json serving', function () {
  it('serves json with a temperature', function (done) {
    request(url, function (er, res, body) {
      assert.deepEqual(JSON.parse(body), {"t": 22750})
      done()
    })
  })
  it('sets the content type to application/json', function (done) {
    request(url, function (er, res, body) {
      assert.equal(res.headers['content-type'], 'application/json')
      done()
    })
  })
})