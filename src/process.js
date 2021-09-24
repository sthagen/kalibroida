
/**
 * Generate function to process the test data from array and execute tests.
 *
 * The generated function accepts an array, verifies the shape and content as well
 * as either executes an uvu is assert using the extracted components or fails the
 * test upon execution with exposure of the problematic test vector.
 *
 * The options object with method and trace members if present sets the assertion method and tracing mode.
 *
 * Defaults are `assert.is` as assertion method and production (non-tracing) mode.
 *
 * Any valid test vector has
 * 1. content
 * 2. is a javascript array
 * 3. has 3 or more items
 * 4. has a function under test or its string representation as first item
 * 5. has the expectation (result) as last item
 * 6. all items but the first and last are positional input parameters to the function under test
 *
 * @param options is an optional object with method and trace members
 * @returns {(function(*=): void)|*}
 */
const process = (options) => {
    return vector => {
        const trace = options && options.trace
        if (trace) console.log(vector, options)
        const default_method = assert.is
        const method = options && options.method
            ? (typeof(options.method) === 'string'
                ? eval(options.method)
                : options.method)
            : default_method
        if (vector && Array.isArray(vector) && vector.length > 2 && typeof (vector[0]) === 'function') {
            const [function_under_test, parameters, expectation] = [
                typeof(vector[0]) === 'string' ? eval(vector[0]) : vector[0], vector.slice(1, -1), vector[vector.length - 1] ]
            if (trace) {
                console.log("Parsed:")
                console.log("       method: ", method)
                console.log("          fut: ", function_under_test)
                console.log("   parameters: ", parameters)
                console.log("  expectation: ", expectation)
            }
            if (!Array.isArray(expectation)) {
                method(function_under_test(...parameters), expectation)
            } else {
                const zipper = '_'
                method(function_under_test(...parameters).join(zipper), expectation.join(zipper))
            }
        } else {
            assert.is(false, true, `test vector data problem: ${JSON.stringify(vector)}`)
        }
    }
}

/**
 * Test builder within suites relying on convention to use system under test object as anchor for functions under test.
 *
 * The test cases must be an array of arrays with only strings as elements.
 * The fixture file absolute path must be present as first or only element.
 * Optionally a test name can be present as second element in addition - if not the name will be derived from fixture.
 *
 * @param sut is the object with all incoming functions under test as members
 * @param executor is the test suite object
 * @param test_cases an array of pairs with the first element the fixture path and the optional second naming the test
 * @param options an optional object to pass through for assert and trace modes
 */
const build_tests = (sut, executor, test_cases, options) => {
    test_cases.forEach(tc => {
        const fixture = tc[0]
        const name = tc.length === 2
            ? tc[1]
            : fixture  // Derive test name from fixture file name
                .split('/')  // Mostly works as universal path separator
                .pop()  // use the last element only (assuming it is the file name
                .replace('_vectors.json', '')  // remove boilerplate from file name, keep the specific part
                .replaceAll('_', ' ').split(' ')  // prepare title case transform - array of words
                .map(s => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
                .join(' ') // back to single string

        executor(name, () => {
            let vectors = require(fixture)
            vectors.forEach(e => e[0] = eval(e[0]))
            vectors.forEach(process(options))
        })
    })
    return executor
}

module.exports = { process, build_tests }

