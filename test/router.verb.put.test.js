/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#put', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  describe('shorthand notation', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.put('songs/:title', 'songs#update');
    });
    
    it('should define application routes', function() {
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/songs/:title');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('songs');
      expect(rv.action).to.equal('update');
    });
  });
  
});
