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
      expect(utils.controllerize('foo_bar_baz_controller')).to.equal('fooBarBaz');
    });
    
    it('should normalize lower camel case path strings', function() {
      expect(utils.controllerize('fooBarBaz')).to.equal('fooBarBaz');
      expect(utils.controllerize('fulano/foo')).to.equal('fulano/foo');
      expect(utils.controllerize('fulanoSutano/fooBar')).to.equal('fulanoSutano/fooBar');
      expect(utils.controllerize('hoge/fulano/foo')).to.equal('hoge/fulano/foo');
      expect(utils.controllerize('hogePage/fulanoSutano/fooBar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize lower camel case path strings ending with controller', function() {
      expect(utils.controllerize('fooBarBazController')).to.equal('fooBarBaz');
    });
    
    it('should normalize upper camel case path strings', function() {
      expect(utils.controllerize('FooBarBaz')).to.equal('fooBarBaz');
      expect(utils.controllerize('Fulano/Foo')).to.equal('fulano/foo');
      expect(utils.controllerize('FulanoSutano/FooBar')).to.equal('fulanoSutano/fooBar');
      expect(utils.controllerize('Hoge/Fulano/Foo')).to.equal('hoge/fulano/foo');
      expect(utils.controllerize('HogePage/FulanoSutano/FooBar')).to.equal('hogePage/fulanoSutano/fooBar');
    });
    
    it('should normalize upper camel case path strings ending with controller', function() {
      expect(utils.controllerize('FooBarBazController')).to.equal('fooBarBaz');
    });
    
    it('should normalize Ruby namespace strings', function() {
      expect(utils.controllerize('FooController')).to.equal('foo');
      expect(utils.controllerize('FooBarController')).to.equal('fooBar');
      expect(utils.controllerize('Bar::FooController')).to.equal('bar/foo');
      expect(utils.controllerize('FulanoSutano::FooBarController')).to.equal('fulanoSutano/fooBar');
      expect(utils.controllerize('Baz::Bar::FooController')).to.equal('baz/bar/foo');
      expect(utils.controllerize('HogePage::FulanoSutano::FooBarController')).to.equal('hogePage/fulanoSutano/fooBar');
    });
  
    it('should return undefined if called without an argument', function() {
      expect(utils.controllerize()).to.be.undefined;
    });
    
  });
  
});
