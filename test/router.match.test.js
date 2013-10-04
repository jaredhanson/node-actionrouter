var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#match', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    }
  }
  
  describe('shorthand notation', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('songs/:title', 'songs#show');
    })
    
    it('should compile route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/songs/:title');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['get'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('songs');
      expect(rv.action).to.equal('show');
    });
  });
  
  describe('shorthand notation and via option', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: 'post' });
    })
    
    it('should compile route', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['post'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
  });
  
  describe('shorthand notation and via option with uppercase value', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: 'POST' });
    })
    
    it('should compile route', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['post'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
  });
  
  describe('shorthand notation and via option with array of methods', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: ['post', 'put'] });
    })
    
    it('should have two methods in route map', function() {
      expect(Object.keys(app.map)).to.have.length(2);
    });
    
    it('should compile post route', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create post route with path and handler', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create post handler for controller action', function() {
      var route = app.map['post'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
    
    it('should compile put route', function() {
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
    });
    
    it('should create put route with path and handler', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create put handler for controller action', function() {
      var route = app.map['put'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
  });
  
  describe('shorthand notation with underscored path to underscored controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo_bar', 'foo_bar#list');
    })
    
    it('should compile route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo_bar');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['get'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('shorthand notation with dasherized path to underscored controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo-bar', 'foo_bar#list');
    })
    
    it('should compile route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo-bar');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['get'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('object notation', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', { controller: 'bands', action: 'list' });
    })
    
    it('should compile route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['get'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('list');
    });
  });
  
  describe('object notation and via option', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.compile(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', { controller: 'bands', action: 'create', via: 'post' });
    })
    
    it('should compile route', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['post'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
  });
  
});
