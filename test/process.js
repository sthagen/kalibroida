const { suite } = require('uvu')
const assert = require('uvu/assert')

const { process, build_tests } = require('../src/process.js')

const echo = (arg) => arg

const fixtures = `${__dirname}/fixtures/`
const default_options = {method: assert.is, trace: false}

const build_tests_proxy = (executor, test_cases, options) => {
    test_cases.forEach(tc => tc[1] = `${fixtures}${tc[1]}`)
    build_tests(echo, executor, test_cases, options)
    return executor
}

let vectors = require('./fixtures/process.json')
vectors.forEach(e => e[0] = eval(e[0]))

const Well = suite("bar")
Well("foo", () => {
  vectors.forEach( kalibroida.process( {"method": "assert.is"} ) )
})
Well.run()

const Other = suite('Fake some other test suite')
build_tests_proxy(
    Other,
    [
        ['bar, baz, or quux', 'process.json'],
    ],
    default_options
).run()
