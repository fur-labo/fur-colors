/**
 * Test case for colors.
 * Runs with mocha.
 */
'use strict'

const colors = require('../lib/colors.js')
const assert = require('assert')

it('Colors', (done) => {
  Object.keys(colors).forEach((key) => {
    assert.ok(colors[ key ]())
  })
  done()
})

/* global it */