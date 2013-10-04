var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#root', function() {
  
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
      
      router.root('pages#main');
    })
    
    it('should define route', function() {
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(1);
    });
    
    it('should create route with path and handler', function() {
      var route = app.map['get'][0];
      expect(route.path).to.equal('/');
      expect(route.handler).to.be.a('function')
    });
    
    it('should create handler for controller action', function() {
      var route = app.map['get'][0]
        , rv = route.handler();
      expect(rv.controller).to.equal('pages');
      expect(rv.action).to.equal('main');
    });
  });
  
});
