# Kalibroida

[![license](https://img.shields.io/github/license/sthagen/kalibroida.svg?style=flat)](https://github.com/sthagen/kalibroida/blob/default/LICENSE)
[![npm version](https://badge.fury.io/js/kalibroida.svg)](https://www.npmjs.com/package/kalibroida)
[![npm](https://img.shields.io/npm/dm/kalibroida.svg)](https://www.npmjs.com/package/kalibroida)

Calibrate (Finnish kalibroida) software through code and data driven tests.

## Synopsis

```javascript
// ...
```

## Description

Convention over configuration for javascript unit tests.
Kalibroida delegeates to [uvu](https://github.com/lukeed/uvu) for the tests kalibroida functions generate from data files (currently JSON supported).

The structure of the data entries (test vectors) in a JSON array follows the convention of providing: 

* a string as first entry representing the System Under Test (SUT),
* the final entry is the expectation, 
* and all entries between represent positional parameters to the function under test.

**Note**: The implementation to test must be imported as `sut` and all evaluated strings from the first entries of the test vectors must resolve to functions hanging off of `sut`.


## Status

Experimental.

**Note**: The default branch is `default`.

