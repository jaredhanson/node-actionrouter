/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#match', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  describe('shorthand notation declared with path preceeded by slash', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('/songs/:title', 'songs#show');
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/songs/:title');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('songs');
      expect(rv.action).to.equal('show');
    });
  });
  
  describe('shorthand notation with snake case controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo-bar', 'foo_bar#list');
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo-bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('shorthand notation with namespaced snake case controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo-bar', 'hoge_page/foo_bar#list');
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo-bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('hogePage/fooBar');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('shorthand notation with Ruby-style controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo_bar', 'FooBar#list');
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo_bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('shorthand notation with Ruby-style namespaced controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo_bar', 'HogePage::FooBar#list');
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo_bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('hogePage/fooBar');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('shorthand notation with snake case action and helper', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      router.assist(function(name, entry) {
        app.helper(name, entry);
      });
      
      router.match('r2-d2', 'robots#beep_boop', { as: 'make_noise' });
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/r2-d2');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('robots');
      expect(rv.action).to.equal('beepBoop');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.makeNoise;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/r2-d2');
      expect(entry.controller).to.equal('robots');
      expect(entry.action).to.equal('beepBoop');
    });
  });
  
});
