const { test } = require('uvu')
const assert = require('uvu/assert')

const process = (options) => {
  return vector => {
    console.log(vector, options)
    const method = typeof(options.method) === 'string'
      ? eval(options.method)
      : options.method
    const [function_under_test, parameters, expectation] = [
      typeof(vector[0]) === 'string' ? eval(vector[0]) : vector[0], vector.slice(1, -1), vector[vector.length - 1] ]
    console.log("Parsed:")
    console.log("       method: ", method)
    console.log("          fut: ", function_under_test)
    console.log("   parameters: ", parameters)
    console.log("  expectation: ", expectation)
  }
}

module.exports = { process }
