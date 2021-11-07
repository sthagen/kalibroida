const { suite } = require('uvu')
const assert = require('uvu/assert')

const kalibroida = require('../src/process.js')

const sut = {}
sut.echo = (arg) => arg

const fixtures = `${__dirname}/fixtures/`
const default_options = {method: assert.is, trace: false}

/**
 * Make the fixture paths absolute, inject sut namespace, and return executor to enable fluid style/chaining of calls.
 *
 * @param executor is an instance of a suite (from uvu)
 * @param test_cases is the array providing the test vectors pointing to the fixtures
 * @param options is an optional object that provides the test assertion method and may request tracing
 * @returns {*}
 */
const build_tests_proxy = (executor, test_cases, options) => {
    test_cases.forEach(tc => {
        tc[0] = `${fixtures}${tc[0]}`  // need absolute path to fixture for hand-over to generic function
    })
    return kalibroida.build_tests(sut, executor, test_cases, options)
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
        ['process.json', 'bar, baz, or quux'],
    ],
    default_options
).run()
