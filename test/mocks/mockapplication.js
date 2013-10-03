var MockRoute = require('./mockroute');


function MockApplication() {
  this.map = {};
}

MockApplication.prototype.get = function(path, handler) {
  var route = new MockRoute(path, handler);
  (this.map['get'] = this.map['get'] || []).push(route);
}


module.exports = MockApplication;
