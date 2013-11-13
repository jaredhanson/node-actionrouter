/* global describe, it, before, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#resource', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
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
    });
    
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
      var entry = app.helpers.account;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/new.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/edit.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers.accountPassword;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password.:format?');
      expect(entry.controller).to.equal('password');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers.newAccountPassword;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password/new.:format?');
      expect(entry.controller).to.equal('password');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers.editAccountPassword;
      
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
    });
    
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
      var entry = app.helpers.account;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/new.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/edit.:format?');
      expect(entry.controller).to.equal('account');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers.accountPassword;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password.:format?');
      expect(entry.controller).to.equal('account/password');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers.newAccountPassword;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password/new.:format?');
      expect(entry.controller).to.equal('account/password');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers.editAccountPassword;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/account/password/edit.:format?');
      expect(entry.controller).to.equal('account/password');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('resource with nested resources', function() {
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
      
      router.resource('settings', function() {
        this.resources('accounts');
      });
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(7);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(2);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(2);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(2);
    });
    
    it('should create route to nested index action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/settings/accounts.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('accounts');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to nested new action', function() {
      var route = app.map['get'][4];
      expect(route.path).to.equal('/settings/accounts/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('accounts');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to nested create action', function() {
      var route = app.map['post'][1];
      expect(route.path).to.equal('/settings/accounts');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('accounts');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to nested show action', function() {
      var route = app.map['get'][5];
      expect(route.path).to.equal('/settings/accounts/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('accounts');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to nested edit action', function() {
      var route = app.map['get'][6];
      expect(route.path).to.equal('/settings/accounts/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('accounts');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to nested update action', function() {
      var route = app.map['put'][1];
      expect(route.path).to.equal('/settings/accounts/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('accounts');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to nested destroy action', function() {
      var route = app.map['delete'][1];
      expect(route.path).to.equal('/settings/accounts/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('accounts');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(7);
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.settings;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings.:format?');
      expect(entry.controller).to.equal('settings');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newSettings;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/new.:format?');
      expect(entry.controller).to.equal('settings');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editSettings;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/edit.:format?');
      expect(entry.controller).to.equal('settings');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register index helper for nested route', function() {
      var entry = app.helpers.settingsAccounts;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts.:format?');
      expect(entry.controller).to.equal('accounts');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers.settingsAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts/:id.:format?');
      expect(entry.controller).to.equal('accounts');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers.newSettingsAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts/new.:format?');
      expect(entry.controller).to.equal('accounts');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers.editSettingsAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts/:id/edit.:format?');
      expect(entry.controller).to.equal('accounts');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('resource with nested resources using namespace option', function() {
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
      
      router.resource('settings', { namespace: true }, function() {
        this.resources('accounts');
      });
    });
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(7);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(2);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(2);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(2);
    });
    
    it('should create route to nested index action', function() {
      var route = app.map['get'][3];
      expect(route.path).to.equal('/settings/accounts.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('settings/accounts');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to nested new action', function() {
      var route = app.map['get'][4];
      expect(route.path).to.equal('/settings/accounts/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('settings/accounts');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to nested create action', function() {
      var route = app.map['post'][1];
      expect(route.path).to.equal('/settings/accounts');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('settings/accounts');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to nested show action', function() {
      var route = app.map['get'][5];
      expect(route.path).to.equal('/settings/accounts/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('settings/accounts');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to nested edit action', function() {
      var route = app.map['get'][6];
      expect(route.path).to.equal('/settings/accounts/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('settings/accounts');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to nested update action', function() {
      var route = app.map['put'][1];
      expect(route.path).to.equal('/settings/accounts/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('settings/accounts');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to nested destroy action', function() {
      var route = app.map['delete'][1];
      expect(route.path).to.equal('/settings/accounts/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('settings/accounts');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(7);
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers.settings;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings.:format?');
      expect(entry.controller).to.equal('settings');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers.newSettings;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/new.:format?');
      expect(entry.controller).to.equal('settings');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers.editSettings;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/edit.:format?');
      expect(entry.controller).to.equal('settings');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register index helper for nested route', function() {
      var entry = app.helpers.settingsAccounts;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts.:format?');
      expect(entry.controller).to.equal('settings/accounts');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers.settingsAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts/:id.:format?');
      expect(entry.controller).to.equal('settings/accounts');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers.newSettingsAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts/new.:format?');
      expect(entry.controller).to.equal('settings/accounts');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers.editSettingsAccount;
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/settings/accounts/:id/edit.:format?');
      expect(entry.controller).to.equal('settings/accounts');
      expect(entry.action).to.equal('edit');
    });
  });
  
});
