/* global describe, it, expect */

var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#draw', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  var app = new MockApplication();
  var router = new Router(handler);
  router.define(function(method, path, handler) {
    app[method](path, handler);
  });
  router.draw(function() {
    this.root('pages#main');
  });
  
  it('should define application routes', function() {
    expect(app.map['get']).to.be.an('array');
    expect(app.map['get']).to.have.length(1);
  });
  
  it('should create route to controller action', function() {
    var route = app.map['get'][0];
    expect(route.path).to.equal('/');
    expect(route.handler).to.be.a('function');
    
    var rv = route.handler();
    expect(rv.controller).to.equal('pages');
    expect(rv.action).to.equal('main');
  });
  
});
