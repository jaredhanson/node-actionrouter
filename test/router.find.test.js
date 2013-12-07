/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#find', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  describe('declared route', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('songs/:title', 'songs#show');
    });
    
    it('should find route', function() {
      var entry = router.find('songs', 'show');
      
      expect(entry.controller).to.equal('songs');
      expect(entry.action).to.equal('show');
      expect(entry.pattern).to.equal('/songs/:title');
    });
  });
  
  describe('highest-priority declared route', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('songs/:title', 'songs#show');
      router.match('songs/:title/legacy', 'songs#show');
    });
    
    it('should find route', function() {
      var entry = router.find('songs', 'show');
      
      expect(entry.controller).to.equal('songs');
      expect(entry.action).to.equal('show');
      expect(entry.pattern).to.equal('/songs/:title');
    });
  });
  
});
