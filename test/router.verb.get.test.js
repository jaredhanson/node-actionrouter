/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#get', function() {
  
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
      
      router.get('songs/:title', 'songs#show');
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
  
  describe('shorthand notation with routing helper', function() {
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
      
      router.get('songs', 'songs#list', { as: 'songs' });
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/songs');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('songs');
      expect(rv.action).to.equal('list');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.songs;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/songs');
      expect(entry.controller).to.equal('songs');
      expect(entry.action).to.equal('list');
    });
  });
  
  describe('object notation', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.get('bands', { controller: 'bands', action: 'list' });
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('object notation with routing helper', function() {
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
      
      router.get('bands', { controller: 'bands', action: 'list', as: 'bands' });
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('list');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.bands;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('list');
    });
  });
  
  describe('middleware function', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.get('lyrics', function() {
        return 'Hello, Function';
      });
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to middleware', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(1);
      expect(route.handler[0]).to.be.a('function');
      
      var rv = route.handler[0]();
      expect(rv).to.equal('Hello, Function');
    });
  });
  
  describe('middleware function array', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      function hello1() {
        return 'Hello, 1';
      }
      function hello2() {
        return 'Hello, 2';
      }
      
      router.get('lyrics', [ hello1, hello2 ]);
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to middleware', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(2);
      expect(route.handler[0]).to.be.a('function');
      expect(route.handler[1]).to.be.a('function');
      
      var rv = route.handler[0]();
      expect(rv).to.equal('Hello, 1');
      rv = route.handler[1]();
      expect(rv).to.equal('Hello, 2');
    });
  });
  
  describe('middleware function chain', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      function hello1() {
        return 'Hello, 1';
      }
      function hello2() {
        return 'Hello, 2';
      }
      
      router.get('lyrics', hello1, hello2);
    });
    
    it('should define application routes', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to middleware', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(2);
      expect(route.handler[0]).to.be.a('function');
      expect(route.handler[1]).to.be.a('function');
      
      var rv = route.handler[0]();
      expect(rv).to.equal('Hello, 1');
      rv = route.handler[1]();
      expect(rv).to.equal('Hello, 2');
    });
  });
  
});
