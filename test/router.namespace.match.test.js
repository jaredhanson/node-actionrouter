/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#namespace', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }

  describe('namespace with match route', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      router.assist(function(name, entry) {
        app.helper(name, entry);
      });
      
      router.namespace('top40', function() {
        router.match('songs/:title', 'songs#show', { as: 'songs' });
      });
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/top40/songs/:title');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('top40/songs');
      expect(rv.action).to.equal('show');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.songs;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/top40/songs/:title');
      expect(entry.controller).to.equal('top40/songs');
      expect(entry.action).to.equal('show');
    });
  });
  
  describe('namespace with match route declared with path preceeded by slash', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.namespace('top40', function() {
        router.match('/bands/:name', 'bands#show');
      });
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/top40/bands/:name');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('top40/bands');
      expect(rv.action).to.equal('show');
    });
  });

});
