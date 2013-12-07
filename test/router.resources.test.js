/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#resources', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  describe('top-level resources', function() {
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
      
      router.resources('bands');
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
      expect(route.path).to.equal('/bands.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to new action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/bands/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to create action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/bands/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/bands/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/bands/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to destroy action', function() {
      var route = app.map['delete'][0];
      expect(route.path).to.equal('/bands/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(4);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers.bands;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.band;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newBand;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/new.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editBand;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id/edit.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('top-level resources with only one action', function() {
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
      
      router.resources('bands', { only: 'show' });
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(1);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/bands/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('show');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(1);
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.band;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
  });
  
  describe('top-level resources with only some actions', function() {
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
      
      router.resources('bands', { only: [ 'index', 'show', 'edit', 'update' ] });
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(2);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(3);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
    });
    
    it('should create route to index action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/bands.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/bands/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/bands/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/bands/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('update');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(3);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers.bands;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.band;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editBand;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id/edit.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('top-level resources excepting one action', function() {
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
      
      router.resources('bands', { except: 'destroy' });
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(3);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(4);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(1);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
    });
    
    it('should create route to index action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/bands.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to new action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/bands/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to create action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/bands');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/bands/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/bands/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/bands/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('update');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(4);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers.bands;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.band;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newBand;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/new.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editBand;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id/edit.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('top-level resources excepting some actions', function() {
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
      
      router.resources('bands',  { except: [ 'new', 'create', 'destroy' ] });
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(2);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(3);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(1);
    });
    
    it('should create route to index action', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/bands.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/bands/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/bands/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/bands/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands');
      expect(rv.action).to.equal('update');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(3);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers.bands;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.band;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editBand;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id/edit.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('top-level resources with param option', function() {
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
      
      router.resources('devices', { param: 'serialNumber' });
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
      expect(route.path).to.equal('/devices.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('devices');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to new action', function() {
      var route = app.map['get'][1];
      expect(route.path).to.equal('/devices/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('devices');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to create action', function() {
      var route = app.map['post'][0];
      expect(route.path).to.equal('/devices');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('devices');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to show action', function() {
      var route = app.map['get'][2];
      expect(route.path).to.equal('/devices/:serialNumber.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('devices');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to edit action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/devices/:serialNumber/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('devices');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to update action', function() {
      var route = app.map['put'][0];
      expect(route.path).to.equal('/devices/:serialNumber');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('devices');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to destroy action', function() {
      var route = app.map['delete'][0];
      expect(route.path).to.equal('/devices/:serialNumber');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('devices');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(4);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers.devices;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/devices.:format?');
      expect(entry.controller).to.equal('devices');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.device;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/devices/:serialNumber.:format?');
      expect(entry.controller).to.equal('devices');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newDevice;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/devices/new.:format?');
      expect(entry.controller).to.equal('devices');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editDevice;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/devices/:serialNumber/edit.:format?');
      expect(entry.controller).to.equal('devices');
      expect(entry.action).to.equal('edit');
    });
  });
  
});
