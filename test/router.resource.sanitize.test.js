/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#resource', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  describe('top-level resource with underscored name', function() {
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
      
      router.resource('foo_bar');
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(3);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(1);
    });
    
    it('should create route to new action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo_bar/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to create action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/foo_bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/foo_bar.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/foo_bar/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/foo_bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to destroy action', function() {
      var route = app.map['delete'][0];
      expect(route.path).to.equal('/foo_bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(3);
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.fooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo_bar.:format?');
      expect(entry.controller).to.equal('fooBar');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo_bar/new.:format?');
      expect(entry.controller).to.equal('fooBar');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo_bar/edit.:format?');
      expect(entry.controller).to.equal('fooBar');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('top-level resource with dasherized name', function() {
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
      
      router.resource('foo-bar');
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(3);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(1);
    });
    
    it('should create route to new action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/foo-bar/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to create action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/foo-bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/foo-bar.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/foo-bar/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/foo-bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to destroy action', function() {
      var route = app.map['delete'][0];
      expect(route.path).to.equal('/foo-bar');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('fooBar');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(3);
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.fooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo-bar.:format?');
      expect(entry.controller).to.equal('fooBar');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo-bar/new.:format?');
      expect(entry.controller).to.equal('fooBar');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editFooBar;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/foo-bar/edit.:format?');
      expect(entry.controller).to.equal('fooBar');
      expect(entry.action).to.equal('edit');
    });
  });
  
});
