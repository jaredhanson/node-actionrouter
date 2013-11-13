/* global describe, it, expect */

var Router = require('../lib/router');
  

describe('Router#verb', function() {
  
  var router = new Router(function(controller, action){});
  
  it('should have get method', function() {
    expect(router.get).to.be.a('function');
  });
  
  it('should have post method', function() {
    expect(router.post).to.be.a('function');
  });
  
  it('should have put method', function() {
    expect(router.put).to.be.a('function');
  });
  
  it('should have del method', function() {
    expect(router.del).to.be.a('function');
  });
  
  it('should alias del to delete', function() {
    expect(router.delete).to.be.a('function');
    expect(router.delete).to.equal(router.del);
  });
  
});
