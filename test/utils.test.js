var utils = require('../lib/utils');
  

describe('utils', function() {
  
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
  
  
  describe('#actionize', function() {
    
    it('should normalize snake case strings', function() {
      expect(utils.controllerize('foo_bar')).to.equal('fooBar');
    });
    
    it('should normalize lower camel case strings', function() {
      expect(utils.controllerize('fooBar')).to.equal('fooBar');
    });
    
    it('should normalize upper camel case strings', function() {
      expect(utils.controllerize('FooBar')).to.equal('fooBar');
    });
    
    it('should return undefined if called without an argument', function() {
      expect(utils.actionize()).to.be.undefined;
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
  
});
