var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#resource', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    }
  }
  
  describe('resource with nested resource', function() {
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
      
      router.resource('account', function() {
        this.resource('password');
      });
    })
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(6);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(2);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(2);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(2);
    });
    
    it('should create route to nested new action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/account/password/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('password');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to nested create action', function() {
      var route = app.map['post'][1];
      expect(route.path).to.equal('/account/password');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('password');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to nested show action', function() {
      var route = app.map['get'][4];
      expect(route.path).to.equal('/account/password.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('password');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to nested edit action', function() {
      var route = app.map['get'][5];
      expect(route.path).to.equal('/account/password/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('password');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to nested update action', function() {
      var route = app.map['put'][1];
      expect(route.path).to.equal('/account/password');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('password');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to nested destroy action', function() {
      var route = app.map['delete'][1];
      expect(route.path).to.equal('/account/password');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('password');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(6);
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers['account'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers['newAccount'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/new.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers['editAccount'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/edit.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers['accountPassword'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password.:format?');
      expect(entry.controller).to.equal('password');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers['newAccountPassword'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password/new.:format?');
      expect(entry.controller).to.equal('password');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers['editAccountPassword'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password/edit.:format?');
      expect(entry.controller).to.equal('password');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('resource with nested resource using namespace option', function() {
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
      
      router.resource('account', { namespace: true }, function() {
        this.resource('password');
      });
    })
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(6);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(2);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(2);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(2);
    });
    
    it('should create route to nested new action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/account/password/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('account/password');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to nested create action', function() {
      var route = app.map['post'][1];
      expect(route.path).to.equal('/account/password');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('account/password');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to nested show action', function() {
      var route = app.map['get'][4];
      expect(route.path).to.equal('/account/password.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('account/password');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to nested edit action', function() {
      var route = app.map['get'][5];
      expect(route.path).to.equal('/account/password/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('account/password');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to nested update action', function() {
      var route = app.map['put'][1];
      expect(route.path).to.equal('/account/password');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('account/password');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to nested destroy action', function() {
      var route = app.map['delete'][1];
      expect(route.path).to.equal('/account/password');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('account/password');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(6);
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers['account'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers['newAccount'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/new.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers['editAccount'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/edit.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers['accountPassword'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password.:format?');
      expect(entry.controller).to.equal('account/password');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers['newAccountPassword'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password/new.:format?');
      expect(entry.controller).to.equal('account/password');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers['editAccountPassword'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password/edit.:format?');
      expect(entry.controller).to.equal('account/password');
      expect(entry.action).to.equal('edit');
    });
  });
  
});
