var Namespace = require('./namespace')
  , utils = require('./utils');


/**
 * `Router` constructor.
 *
 * @api private
 */
function Router(handler) {
  if (!handler) { throw new TypeError('Router constructor requires a handler function'); }
  
  this._handler = handler;
  this._compile = undefined;
  
  this._routes = {};
  this._ns = [];
  this._ns.push(new Namespace());
}

/**
 * Create a route to the root path ('/').
 *
 * For options, see `match()`, as `root()` invokes it internally.
 *
 * The root route should be placed at the top of `config/routes.js` in order to
 * match against it first.  As this route is typically the most popular route of
 * a web application, this is an optimization.
 * 
 * Examples:
 *
 *     this.root('pages#main');
 *
 * @param {String|Object} shorthand
 * @param {Object} options
 * @api public
 */
Router.prototype.root = function(shorthand, options) {
  this.match('', shorthand, options);
}

/**
 * Create a route matching `pattern`.
 *
 * A route that will be handled by `SongsController#show()` can be specified
 * using shorthand notation:
 *
 *     this.match('songs/:title', 'songs#show');
 *
 * which is equivalent to using `controller` and `action` options.
 *
 *     this.match('songs/:title', { controller: 'songs', action: 'show' });
 *
 *
 * If an `as` option is specified, path and URL routing helper functions will be
 * dynamically declared.  For example, given the following route:
 *
 *    this.match('bands/:id', 'bands#show', { as: 'bands' });
 *
 * the following routing helpers will be available to views:
 *
 *    bandsPath(101)
 *    // => "/bands/101"
 *    bandsPath('counting-crows')
 *    // => "/bands/counting-crows"
 *    bandsPath({ id: '507f1f77bcf86cd799439011' })
 *    // => "/bands/507f1f77bcf86cd799439011"
 *
 *    bandsURL(101)
 *    // => "http://www.example.com/bands/101"
 *    bandsPath('counting-crows')
 *    // => "http://www.example.com/bands/counting-crows"
 *    bandsPath({ id: '507f1f77bcf86cd799439011' })
 *    // => "http://www.example.com/bands/507f1f77bcf86cd799439011"
 *
 *
 * Options:
 *
 *  - 'controller'  the route's controller
 *  - 'action'      the route's action
 *  - `as`          name used to declare routing helpers
 *  - `via`         allowed HTTP method(s) for route
 * 
 * Examples:
 *
 *     this.match('songs/:title', 'songs#show');
 *
 *     this.match('songs/:title', { controller: 'songs', action: 'show' });
 *
 *     this.match('bands', 'bands#create', { via: 'post' });
 *
 * @param {String} pattern
 * @param {String|Object} shorthand
 * @param {Object} options
 * @api public
 */
Router.prototype.match = function(pattern, shorthand, options) {
  if (!options && typeof shorthand === 'object') {
    options = shorthand;
  }
  if (typeof options == 'function' && typeof arguments[arguments.length - 1] == 'object') {
    options = arguments[arguments.length - 1];
  }
  options = options || {};
  
  if (typeof shorthand === 'string') {
    var split = shorthand.split('#');
    options.controller = split[0];
    options.action = split[1];
  }
  
  var ns = this._ns[this._ns.length - 1]
    , method = (options.via || 'get')
    , methods = Array.isArray(method) ? method : [ method ]
    , path = ns.qpath(pattern)
    , controller = ns.qcontroller(options.controller)
    , action = utils.actionize(options.action)
    , helper = utils.helperize(options.as);
  
  for (var i = 0, len = methods.length; i < len; i++) {
    var method = methods[i].toLowerCase();
    if (typeof shorthand === 'function' || Array.isArray(shorthand)) {
      var callbacks = utils.flatten([].slice.call(arguments, 1));
      // pop off any final options argument
      if (typeof callbacks[callbacks.length - 1] != 'function') { callbacks.pop(); }
    
      // Mount functions or arrays of functions directly as Express route
      // handlers/middleware.
      if (callbacks.length == 1) {
        this._http[method](path, callbacks[0]);
      } else {
        this._http[method](path, callbacks);
      }
    } else {
      this._route(method, path, controller, action, { helper: helper });
    }
  }
}

/**
 * Registers a function used to compile routes to an underling server.
 *
 * When declaring routes, `Router` creates handler functions bound to a
 * controller action.  It is the responsiblity of the framework making use of
 * `Router` to then mount these functions in a manner in which they can be
 * invoked by an underlying server.
 *
 * For instance, Locomotive mounts handlers using Express.
 *
 * Examples:
 *
 *     var app = express();
 *     
 *     router.compile(function(method, path, callbacks) {
 *       app[method](path, callbacks);
 *     });
 *
 * @param {Function} method
 * @api public
 */
Router.prototype.compile = function(method, pattern, callbacks) {
  if (typeof method === 'function') {
    this._compile = method;
    return this;
  }
  
  if (!this._compile) { throw new Error('Route compiler is not defined'); }
  this._compile.apply(undefined, arguments);
}

/**
 * Create route from `method` and `pattern` to `controller` and `action`.
 * 
 * @param {String} method
 * @param {String} pattern
 * @param {String} controller
 * @param {String} action
 * @api private
 */
Router.prototype._route = function(method, pattern, controller, action, options) {
  options = options || {};
  
  // Compile a route handler that dispatches to a controller action.
  this.compile(method, pattern, this._handler(controller, action));
  
  // Add the route to the reverse routing table.  The reverse routing table is
  // used by routing helper functions to construct URLs to a specific controller
  // action.  When building paths and URLs, routes declared first take priority.
  // Therefore, if there is already an entry for this controller action in the
  // table, don't overwrite it.
  //var route = new Route(method, pattern, controller, action);
  
  //var key = route.reverseKey();
  //if (!this._routes[key]) {
  //  this._routes[key] = route;
  //}
  
  // Declare path and URL routing helper functions.
  //if (options.helper) {
  //  var helper = options.helper;
  //  this._app.helper(helper + 'Path', route.helper());
  //  this._app.dynamicHelper(helper + 'URL', route.helper(true));
  //}
}


/**
 * Expose `Router`.
 */
module.exports = Router;
