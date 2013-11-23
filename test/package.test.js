/* global describe, it, expect */

var router = require('..');
  

describe('actionrouter', function() {
  
  it('should export constructors', function() {
    expect(router.Router).to.be.a('function');
  });
  
  it('should export utilities', function() {
    expect(router.util.controllerize).to.be.a('function');
    expect(router.util.functionize).to.be.a('function');
  });
  
});
