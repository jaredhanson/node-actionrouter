var MockRoute = require('./mockroute');


function MockApplication() {
  this.map = {};
  this.helpers = {};
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

MockApplication.prototype.del = 
MockApplication.prototype.delete = function(path, handler) {
  var route = new MockRoute(path, handler);
  (this.map['delete'] = this.map['delete'] || []).push(route);
}

MockApplication.prototype.helper = function(name, entry) {
  this.helpers[name] = entry;
}


module.exports = MockApplication;
