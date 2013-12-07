/* global describe, it, expect */

var utils = require('../lib/utils');
  

describe('utils', function() {
  
  describe('#underscore', function() {
    it('should preserve underscore strings', function() {
      expect(utils.underscore('foo_bar')).to.equal('foo_bar');
    });
    it('should preserve underscore strings in namespaces', function() {
      expect(utils.underscore('fulano_sutano/foo_bar')).to.equal('fulano_sutano/foo_bar');
    });
    
    it('should underscore lower camelcase strings', function() {
      expect(utils.underscore('fooBar')).to.equal('foo_bar');
    });
    it('should underscore lower camelcase strings with consequtive uppercase letters', function() {
      expect(utils.underscore('sslError')).to.equal('ssl_error');
    });
    it('should underscore lower camelcase strings in namespaces', function() {
      expect(utils.underscore('fulanoSutano/fooBar')).to.equal('fulano_sutano/foo_bar');
    });
    
    it('should underscore upper camelcase strings', function() {
      expect(utils.underscore('FooBar')).to.equal('foo_bar');
    });
    it('should underscore upper camelcase strings with consequtive uppercase letters', function() {
      expect(utils.underscore('SSLError')).to.equal('ssl_error');
    });
    it('should underscore upper camelcase strings in namespaces', function() {
      expect(utils.underscore('FulanoSutano/FooBar')).to.equal('fulano_sutano/foo_bar');
    });
    
    it('should underscore dasherized strings', function() {
      expect(utils.underscore('foo-bar')).to.equal('foo_bar');
    });
  });
  
  describe('#moduleize', function() {
    
    it('should normalize snake case path strings', function() {
      expect(utils.moduleize('foo_bar_baz')).to.equal('fooBarBaz');
      expect(utils.moduleize('fulano/foo')).to.equal('fulano/foo');
      expect(utils.moduleize('fulano_sutano/foo_bar')).to.equal('fulanoSutano/fooBar');
      expect(utils.moduleize('hoge/fulano/foo')).to.equal('hoge/fulano/foo');
      expect(utils.moduleize('hoge_page/fulano_sutano/foo_bar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize lower camel case path strings', function() {
      expect(utils.moduleize('fooBarBaz')).to.equal('fooBarBaz');
      expect(utils.moduleize('fulanoSutano/fooBar')).to.equal('fulanoSutano/fooBar');
      expect(utils.moduleize('hogePage/fulanoSutano/fooBar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize upper camel case path strings', function() {
      expect(utils.moduleize('FooBarBaz')).to.equal('fooBarBaz');
      expect(utils.moduleize('FulanoSutano/FooBar')).to.equal('fulanoSutano/fooBar');
      expect(utils.moduleize('HogePage/FulanoSutano/FooBar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should return undefined if called without an argument', function() {
      expect(utils.moduleize()).to.be.undefined;
    });
    
  });
  
  
  describe('#controllerize', function() {
    
    it('should normalize snake case path strings', function() {
      expect(utils.controllerize('foo_bar_baz')).to.equal('fooBarBaz');
      expect(utils.controllerize('fulano/foo')).to.equal('fulano/foo');
      expect(utils.controllerize('fulano_sutano/foo_bar')).to.equal('fulanoSutano/fooBar');
      expect(utils.controllerize('hoge/fulano/foo')).to.equal('hoge/fulano/foo');
      expect(utils.controllerize('hoge_page/fulano_sutano/foo_bar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize snake case path strings ending with controller', function() {
      expect(utils.controllerize('foo_controller')).to.equal('foo');
      expect(utils.controllerize('foo_bar_controller')).to.equal('fooBar');
      expect(utils.controllerize('foo_bar_baz_controller')).to.equal('fooBarBaz');
      expect(utils.controllerize('fulano/foo_controller')).to.equal('fulano/foo');
    });
    
    it('should normalize lower camel case path strings', function() {
      expect(utils.controllerize('fooBarBaz')).to.equal('fooBarBaz');
      expect(utils.controllerize('fulano/foo')).to.equal('fulano/foo');
      expect(utils.controllerize('fulanoSutano/fooBar')).to.equal('fulanoSutano/fooBar');
      expect(utils.controllerize('hoge/fulano/foo')).to.equal('hoge/fulano/foo');
      expect(utils.controllerize('hogePage/fulanoSutano/fooBar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize lower camel case path strings ending with controller', function() {
      expect(utils.controllerize('fooController')).to.equal('foo');
      expect(utils.controllerize('fooBarController')).to.equal('fooBar');
      expect(utils.controllerize('fooBarBazController')).to.equal('fooBarBaz');
      expect(utils.controllerize('fulano/fooController')).to.equal('fulano/foo');
    });
    
    it('should normalize upper camel case path strings', function() {
      expect(utils.controllerize('FooBarBaz')).to.equal('fooBarBaz');
      expect(utils.controllerize('Fulano/Foo')).to.equal('fulano/foo');
      expect(utils.controllerize('FulanoSutano/FooBar')).to.equal('fulanoSutano/fooBar');
      expect(utils.controllerize('Hoge/Fulano/Foo')).to.equal('hoge/fulano/foo');
      expect(utils.controllerize('HogePage/FulanoSutano/FooBar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize upper camel case path strings ending with controller', function() {
      expect(utils.controllerize('FooController')).to.equal('foo');
      expect(utils.controllerize('FooBarController')).to.equal('fooBar');
      expect(utils.controllerize('FooBarBazController')).to.equal('fooBarBaz');
      expect(utils.controllerize('Fulano/FooController')).to.equal('fulano/foo');
    });
    
    it('should normalize Ruby namespace strings', function() {
      expect(utils.controllerize('FooBarBaz')).to.equal('fooBarBaz');
      expect(utils.controllerize('Fulano::Foo')).to.equal('fulano/foo');
      expect(utils.controllerize('FulanoSutano::FooBar')).to.equal('fulanoSutano/fooBar');
      expect(utils.controllerize('Hoge::Fulano::Foo')).to.equal('hoge/fulano/foo');
      expect(utils.controllerize('HogePage::FulanoSutano::FooBar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize Ruby namespace strings ending with controller', function() {
      expect(utils.controllerize('FooController')).to.equal('foo');
      expect(utils.controllerize('FooBarController')).to.equal('fooBar');
      expect(utils.controllerize('FooBarBazController')).to.equal('fooBarBaz');
      expect(utils.controllerize('Fulano::FooController')).to.equal('fulano/foo');
    });
  
    it('should return undefined if called without an argument', function() {
      expect(utils.controllerize()).to.be.undefined;
    });
    
  });
  
  
  describe('#functionize', function() {
    
    it('should normalize common strings', function() {
      expect(utils.functionize('foo')).to.equal('foo');
      expect(utils.functionize('foo', 'Path')).to.equal('fooPath');
      expect(utils.functionize('foo', 'URL')).to.equal('fooURL');
      expect(utils.functionize('edit', 'foo', 'path')).to.equal('editFooPath');
    });
    
    it('should normalize snake case strings', function() {
      expect(utils.functionize('foo_bar')).to.equal('fooBar');
      expect(utils.functionize('foo_bar', 'Path')).to.equal('fooBarPath');
      expect(utils.functionize('foo_bar', 'URL')).to.equal('fooBarURL');
      expect(utils.functionize('edit', 'foo_bar', 'path')).to.equal('editFooBarPath');
    });
    
    it('should normalize lower camel case strings', function() {
      expect(utils.functionize('fooBar')).to.equal('fooBar');
      expect(utils.functionize('fooBar', 'Path')).to.equal('fooBarPath');
      expect(utils.functionize('fooBar', 'URL')).to.equal('fooBarURL');
      expect(utils.functionize('edit', 'fooBar', 'path')).to.equal('editFooBarPath');
    });
    
    it('should normalize upper camel case strings', function() {
      expect(utils.functionize('FooBar')).to.equal('fooBar');
      expect(utils.functionize('FooBar', 'Path')).to.equal('fooBarPath');
      expect(utils.functionize('FooBar', 'URL')).to.equal('fooBarURL');
      expect(utils.functionize('Edit', 'FooBar', 'Path')).to.equal('editFooBarPath');
    });
    
    it('should return undefined if called without an argument', function() {
      expect(utils.functionize()).to.be.undefined;
    });
    
  });
  
});
