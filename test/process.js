const { readFile } = require('fs/promises')
const { suite } = require('uvu')
const assert = require('uvu/assert')
const kalibroida = require('../src/process.js')

const echo = (arg) => arg
const vectors = JSON.parse(await readFile("./fixtures/process.json", "utf8")).forEach((_, i, a) => a[0] = eval(a[0]))

const Well = suite("bar")
Well("foo", () => {
  vectors.forEach( kalibroida.process( {"method": "assert.is"} ) )
})
Well.run()
