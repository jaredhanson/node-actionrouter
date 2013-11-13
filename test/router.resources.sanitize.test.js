/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#resources', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  describe('top-level resources with underscored name', function() {
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
      
      router.resources('foo_bars');
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(4);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(1);
    });
    
    it('should create route to index action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo_bars.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to new action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/foo_bars/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to create action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/foo_bars');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/foo_bars/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/foo_bars/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/foo_bars/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to destroy action', function() {
      var route = app.map['delete'][0];
      expect(route.path).to.equal('/foo_bars/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(4);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers.fooBars;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo_bars.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.fooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo_bars/:id.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo_bars/new.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo_bars/:id/edit.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('top-level resources with dasherized name', function() {
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
      
      router.resources('foo-bars');
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(4);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(1);
    });
    
    it('should create route to index action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo-bars.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to new action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/foo-bars/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to create action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/foo-bars');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/foo-bars/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/foo-bars/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/foo-bars/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to destroy action', function() {
      var route = app.map['delete'][0];
      expect(route.path).to.equal('/foo-bars/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBars');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(4);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers.fooBars;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo-bars.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.fooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo-bars/:id.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo-bars/new.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo-bars/:id/edit.:format?');
      expect(entry.controller).to.equal('fooBars');
      expect(entry.action).to.equal('edit');
    });
  });
  
});
