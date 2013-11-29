/* global describe, it, expect */

var Entry = require('../lib/entry');
  

describe('Entry', function() {
  
  describe('without placeholders', function() {
    var e = new Entry('account', 'show', '/account');
    
    it('should have key based on controller action', function() {
      expect(e.key()).to.equal('account#show');
    });
    
    it('should have controller and action properties', function() {
      expect(e.controller).to.equal('account');
      expect(e.action).to.equal('show');
    });
    
    it('should have pattern property', function() {
      expect(e.pattern).to.equal('/account');
    });
    
    it('should have keys property', function() {
      expect(e.keys).to.be.an('array');
      expect(e.keys).to.have.length(0);
    });
    
    it('should build path', function() {
      expect(e.path()).to.equal('/account');
    });
  });
  
  describe('with one placeholder', function() {
    var e = new Entry('profile', 'show', '/user/:id');
    
    it('should have key based on controller action', function() {
      expect(e.key()).to.equal('profile#show');
    });
    
    it('should have controller and action properties', function() {
      expect(e.controller).to.equal('profile');
      expect(e.action).to.equal('show');
    });
    
    it('should have pattern property', function() {
      expect(e.pattern).to.equal('/user/:id');
    });
    
    it('should have keys property', function() {
      expect(e.keys).to.be.an('array');
      expect(e.keys).to.have.length(1);
      expect(e.keys[0].name).to.equal('id');
      expect(e.keys[0].optional).to.be.false;
    });
    
    it('should build path', function() {
      expect(e.path({ id: 1234 })).to.equal('/user/1234');
    });
    
    it('should build path with id set to 0', function() {
      expect(e.path({ id: 0 })).to.equal('/user/0');
    });
    
    it('should throw when building path and missing placeholder options', function() {
      expect(function() {
        e.path();
      }).to.throw('Unable to substitute value for ":id" in URL pattern "/user/:id"');
    });
    
    it('should throw when building path and missing placeholder value', function() {
      expect(function() {
        e.path({ foo: 'bar' });
      }).to.throw('Unable to substitute value for ":id" in URL pattern "/user/:id"');
    });
  });
  
  describe('with one placeholder followed by segment', function() {
    var e = new Entry('profile', 'show', '/user/:id/profile');
    
    it('should have key based on controller action', function() {
      expect(e.key()).to.equal('profile#show');
    });
    
    it('should have controller and action properties', function() {
      expect(e.controller).to.equal('profile');
      expect(e.action).to.equal('show');
    });
    
    it('should have pattern property', function() {
      expect(e.pattern).to.equal('/user/:id/profile');
    });
    
    it('should have keys property', function() {
      expect(e.keys).to.be.an('array');
      expect(e.keys).to.have.length(1);
      expect(e.keys[0].name).to.equal('id');
      expect(e.keys[0].optional).to.be.false;
    });
    
    it('should build path', function() {
      expect(e.path({ id: 1234 })).to.equal('/user/1234/profile');
    });
    
    it('should build path with id set to 0', function() {
      expect(e.path({ id: 0 })).to.equal('/user/0/profile');
    });
  });
  
  describe('with two placeholders', function() {
    var e = new Entry('profile', 'show', '/user/:id/:name');
    
    it('should have key based on controller action', function() {
      expect(e.key()).to.equal('profile#show');
    });
    
    it('should have controller and action properties', function() {
      expect(e.controller).to.equal('profile');
      expect(e.action).to.equal('show');
    });
    
    it('should have pattern property', function() {
      expect(e.pattern).to.equal('/user/:id/:name');
    });
    
    it('should have keys property', function() {
      expect(e.keys).to.be.an('array');
      expect(e.keys).to.have.length(2);
      expect(e.keys[0].name).to.equal('id');
      expect(e.keys[0].optional).to.be.false;
      expect(e.keys[1].name).to.equal('name');
      expect(e.keys[1].optional).to.be.false;
    });
    
    it('should build path', function() {
      expect(e.path({ id: 1234, name: 'jared-hanson' })).to.equal('/user/1234/jared-hanson');
    });
    
    it('should build path with id set to 0', function() {
      expect(e.path({ id: 0, name: 'jared-hanson' })).to.equal('/user/0/jared-hanson');
    });
  });
  
  describe('with optional placeholder preceded by dot', function() {
    var e = new Entry('products', 'index', '/products.:format?');
    
    it('should have pattern property', function() {
      expect(e.pattern).to.equal('/products.:format?');
    });
    
    it('should have keys property', function() {
      expect(e.keys).to.be.an('array');
      expect(e.keys).to.have.length(1);
      expect(e.keys[0].name).to.equal('format');
      expect(e.keys[0].optional).to.be.true;
    });
    
    it('should build path without value for placeholder', function() {
      expect(e.path()).to.equal('/products');
      expect(e.path({})).to.equal('/products');
    });
    
    it('should build path with value for placeholder', function() {
      expect(e.path({ format: 'json' })).to.equal('/products.json');
    });
  });
  
  describe('with optional placeholder preceded by slash', function() {
    var e = new Entry('service', 'control', '/service/:op?');
    
    it('should have pattern property', function() {
      expect(e.pattern).to.equal('/service/:op?');
    });
    
    it('should have keys property', function() {
      expect(e.keys).to.be.an('array');
      expect(e.keys).to.have.length(1);
      expect(e.keys[0].name).to.equal('op');
      expect(e.keys[0].optional).to.be.true;
    });
    
    it('should build path without value for placeholder', function() {
      expect(e.path()).to.equal('/service');
      expect(e.path({})).to.equal('/service');
    });
    
    it('should build path with value for placeholder', function() {
      expect(e.path({ op: 'stop' })).to.equal('/service/stop');
    });
  });
  
});
