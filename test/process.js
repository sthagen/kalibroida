const { suite } = require('uvu');
const assert = require('uvu/assert');
const kalibroida = require('../src/process.js')

const echo = (arg) => arg

let vector = ['echo', 42, 42]
vector[0] = eval(vector[0])
const Well = suite("bar")
Well("foo", () => {
  [
    [...vector],
  ].forEach( kalibroida.process( {"method": "assert.is"} ) )
})
Well.run()
