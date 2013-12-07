/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#match', function() {
  
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
      
      router.match('songs/:title', 'songs#show');
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
  
  describe('shorthand notation and via option', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: 'post' });
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
  
  describe('shorthand notation and via option with uppercase value', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: 'POST' });
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
  
  describe('shorthand notation and via option with array of methods', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: ['post', 'put'] });
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(2);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
    });
    
    it('should create post route to controller action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
    
    it('should create put route to controller action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
  });
  
  describe('shorthand notation and via option that is not a valid method', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
    });
    
    it('should throw when declaring route', function() {
      expect(function() {
        router.match('bands', 'bands#create', { via: 'foo' });
      }).to.throw('Method "foo" is not supported by protocol');
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
      
      router.match('songs', 'songs#list', { as: 'songs' });
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
      
      router.match('bands', { controller: 'bands', action: 'list' });
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
  
  describe('object notation and via option', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', { controller: 'bands', action: 'create', via: 'post' });
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
  
  describe('middleware function', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('lyrics', function() {
        return 'Hello, Function';
      });
    });
    
    it('should define application route', function() {
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
  
  describe('middleware function and via option', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('lyrics', function() {
        return 'Hello, Function';
      }, { via: 'post' });
    });
    
    it('should define application route', function() {
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
      
      router.match('lyrics', [ hello1, hello2 ]);
    });
    
    it('should define application route', function() {
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
  
  describe('middleware function array and via option', function() {
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
      
      router.match('lyrics', [ hello1, hello2 ], { via: 'post' });
    });
    
    it('should define application route', function() {
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
      
      router.match('lyrics', hello1, hello2);
    });
    
    it('should define application route', function() {
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
  
  describe('middleware function chain and via option', function() {
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
      
      router.match('lyrics', hello1, hello2, { via: 'post' });
    });
    
    it('should define application route', function() {
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
  
  describe('middleware function with routing helper', function() {
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
      
      router.match('hello', function() {
        return 'Hello, Function';
      }, { as: 'hello' });
    });
    
    it('should define application route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to middleware to path', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/hello');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(1);
      expect(route.handler[0]).to.be.a('function');
      
      var rv = route.handler[0]();
      expect(rv).to.equal('Hello, Function');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.hello;
      
      expect(entry).to.be.a('string');
      expect(entry).to.equal('/hello');
    });
  });
  
  describe('middleware function with routing helper to path with pattern', function() {
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
      
      router.match('hello/:name', function() {
        return 'Hello, Function';
      }, { as: 'hello' });
    });
    
    it('should define application route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to middleware', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/hello/:name');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(1);
      expect(route.handler[0]).to.be.a('function');
      
      var rv = route.handler[0]();
      expect(rv).to.equal('Hello, Function');
    });
    
    it('should register helper for route', function() {
      var entry = app.helpers.hello;
      
      expect(entry).to.be.a('string');
      expect(entry).to.equal('/hello/:name');
    });
  });
  
  describe('shorthand notation with handler registered later', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router();
      router.handler(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('songs/:title', 'songs#show');
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
  
});
