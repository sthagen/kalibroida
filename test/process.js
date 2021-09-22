const { suite } = require('uvu');
const assert = require('uvu/assert');
const kalibroida = require('./process.js')

const echo = (arg) => arg

const Well = suite("bar")
Well("foo", () => {
    [
        ['echo', 42, 42],
    ].forEach( kalibroida.process( {"method": "assert.is"} ) )
})
Well.run()
