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
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('songs/:title', 'songs#show');
    })
    
    it('should define route', function() {
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
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: 'post' });
    })
    
    it('should define route', function() {
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
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: 'POST' });
    })
    
    it('should define route', function() {
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
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', 'bands#create', { via: ['post', 'put'] });
    })
    
    it('should have two methods in route map', function() {
      expect(Object.keys(app.map)).to.have.length(2);
    });
    
    it('should define post route', function() {
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
    
    it('should define put route', function() {
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
  
  // TODO: Move this to path test
  describe('shorthand notation with underscored path to underscored controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo_bar', 'foo_bar#list');
    })
    
    it('should define route', function() {
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
  
  // TODO: Move this to path test
  describe('shorthand notation with dasherized path to underscored controller', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('foo-bar', 'foo_bar#list');
    })
    
    it('should define route', function() {
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
  
  // TODO: Move this to path test
  describe('shorthand notation with path preceeded by slash', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('/songs/:title', 'songs#show');
    })
    
    it('should define route', function() {
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
  
  describe('object notation', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', { controller: 'bands', action: 'list' });
    })
    
    it('should define route', function() {
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
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('bands', { controller: 'bands', action: 'create', via: 'post' });
    })
    
    it('should define route', function() {
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
  
  describe('direct to function', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('lyrics', function() {
        return 'Hello, Function';
      });
    })
    
    it('should define route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(1);
      expect(route.handler[0]).to.be.a('function');
    });
    
    it('should create handler with function', function() {
      var route = app.map['get'][0]
        , rv = route.handler[0]();
      expect(rv).to.equal('Hello, Function');
    });
  });
  
  describe('direct to function with via option', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      
      router.match('lyrics', function() {
        return 'Hello, Function';
      }, { via: 'post' });
    })
    
    it('should define route', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(1);
      expect(route.handler[0]).to.be.a('function');
    });
    
    it('should create handler with function', function() {
      var route = app.map['post'][0]
        , rv = route.handler[0]();
      expect(rv).to.equal('Hello, Function');
    });
  });
  
  describe('direct to array of functions', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
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
    })
    
    it('should define route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(2);
      expect(route.handler[0]).to.be.a('function');
      expect(route.handler[1]).to.be.a('function');
    });
    
    it('should create handler with array function', function() {
      var route = app.map['get'][0]
        , rv = route.handler[0]();
      expect(rv).to.equal('Hello, 1');
      rv = route.handler[1]();
      expect(rv).to.equal('Hello, 2');
    });
  });
  
  describe('direct to array of functions with via option', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
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
    })
    
    it('should define route', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(2);
      expect(route.handler[0]).to.be.a('function');
      expect(route.handler[1]).to.be.a('function');
    });
    
    it('should create handler with array function', function() {
      var route = app.map['post'][0]
        , rv = route.handler[0]();
      expect(rv).to.equal('Hello, 1');
      rv = route.handler[1]();
      expect(rv).to.equal('Hello, 2');
    });
  });
  
  describe('direct to function chain', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
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
    })
    
    it('should define route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(2);
      expect(route.handler[0]).to.be.a('function');
      expect(route.handler[1]).to.be.a('function');
    });
    
    it('should create handler with array function', function() {
      var route = app.map['get'][0]
        , rv = route.handler[0]();
      expect(rv).to.equal('Hello, 1');
      rv = route.handler[1]();
      expect(rv).to.equal('Hello, 2');
    });
  });
  
  describe('direct to function chain with via option', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
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
    })
    
    it('should define route', function() {
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/lyrics');
      expect(route.handler).to.be.an('array');
      expect(route.handler).to.have.length(2);
      expect(route.handler[0]).to.be.a('function');
      expect(route.handler[1]).to.be.a('function');
    });
    
    it('should create handler with array function', function() {
      var route = app.map['post'][0]
        , rv = route.handler[0]();
      expect(rv).to.equal('Hello, 1');
      rv = route.handler[1]();
      expect(rv).to.equal('Hello, 2');
    });
  });
  
  describe('shorthand notation with declared helpers', function() {
    var router, app;
    
    before(function() {
      router = new Router(handler);
      app = new MockApplication();
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      router.assist(function(name, route) {
        app.helper(name, route);
      });
      
      router.match('songs', 'songs#list', { as: 'songs' });
    })
    
    it('should define route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/songs');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['get'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('songs');
      expect(rv.action).to.equal('list');
    });
    
    it('should declare helpers', function() {
      var r = app.helpers['songs'];
      
      expect(r).to.be.an('object');
      expect(r.pattern).to.equal('/songs');
      expect(r.controller).to.equal('songs');
      expect(r.action).to.equal('list');
    });
  });
  
});
