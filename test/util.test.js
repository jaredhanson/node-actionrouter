/* global describe, it, expect */

var util = require('../lib/util')
  , utils = require('../lib/utils');
  

describe('utils', function() {

  it('should publicly export controllerize', function() {
    expect(util.controllerize).to.be.a('function');
    expect(util.controllerize).to.equal(utils.controllerize);
  });

});
