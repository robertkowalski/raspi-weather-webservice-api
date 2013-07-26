var http = require('http')
var fs = require('fs')
var glob = require('glob')
var tsr = require('temperature-stream')
var Transform = require('stream').Transform || require('readable-stream').Transform

var env = process.env
var port = env.PORT || 1338

module.exports = serveApi
function serveApi (cb) {
  http.createServer(function (req, res) {

    glob(env.FILE
      || '/sys/bus/w1/devices/28-*/w1_slave', function (er, files) {
      if (er)
        cb(er)

      res.writeHeader(200, {'Content-Type': 'application/json'});
      fs.createReadStream(files[0])
        .pipe(tsr())
        .pipe(wrapJson())
        .pipe(res)
    })

  }).listen(port, function () {
    console.log('api listening...')
    cb && cb()
  })
}

serveApi.port = port


function wrapJson () {
  var init = true
  var stream = new Transform()

  stream._transform = function (chunk, enc, cb) {
    if (init) {
      stream.push(new Buffer('{"t": ', 'utf8'))
      init = false
    }
    stream.push(chunk)

    cb()
  }

  stream._flush = function (cb) {
    stream.push(new Buffer('}', 'utf8'))
    cb()
  }

  return stream
}