/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#post', function() {
  
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
      
      router.post('songs', 'songs#create');
    });
    
    it('should define application routes', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/songs');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('songs');
      expect(rv.action).to.equal('create');
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
      
      router.post('songs', 'songs#create', { as: 'songs' });
    });
    
    it('should define application routes', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/songs');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('songs');
      expect(rv.action).to.equal('create');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.songs;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/songs');
      expect(entry.controller).to.equal('songs');
      expect(entry.action).to.equal('create');
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
      
      router.post('bands', { controller: 'bands', action: 'create' });
    });
    
    it('should define application routes', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
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
      
      router.post('bands', { controller: 'bands', action: 'create', as: 'bands' });
    });
    
    it('should define application routes', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route to controller action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.bands;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('create');
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
      
      router.post('lyrics', function() {
        return 'Hello, Function';
      });
    });
    
    it('should define application routes', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route to middleware', function() {
      var route = app.map['post'][0];
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
      
      router.post('lyrics', [ hello1, hello2 ]);
    });
    
    it('should define application routes', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route to middleware', function() {
      var route = app.map['post'][0];
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
      
      router.post('lyrics', hello1, hello2);
    });
    
    it('should define application routes', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route to middleware', function() {
      var route = app.map['post'][0];
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
