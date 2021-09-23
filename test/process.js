const { suite } = require('uvu')
const assert = require('uvu/assert')
const kalibroida = require('../src/process.js')

const echo = (arg) => arg

const vectors = require('./fixtures/process.json').forEach(e => e[0] = eval(e[0]))

const Well = suite("bar")
Well("foo", () => {
  vectors.forEach( kalibroida.process( {"method": "assert.is"} ) )
})
Well.run()
