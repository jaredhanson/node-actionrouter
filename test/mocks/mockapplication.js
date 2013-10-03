var MockRoute = require('./mockroute');


function MockApplication() {
  this.map = {};
}

MockApplication.prototype.get = function(path, handler) {
  var route = new MockRoute(path, handler);
  (this.map['get'] = this.map['get'] || []).push(route);
}

MockApplication.prototype.post = function(path, handler) {
  var route = new MockRoute(path, handler);
  (this.map['post'] = this.map['post'] || []).push(route);
}

MockApplication.prototype.put = function(path, handler) {
  var route = new MockRoute(path, handler);
  (this.map['put'] = this.map['put'] || []).push(route);
}


module.exports = MockApplication;
