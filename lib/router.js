/**
 * Module dependencies.
 */
var Namespace = require('./namespace')
  , inflect = require('i')()
  , utils = require('./utils')
  , Entry = require('./entry');


/**
 * `Router` constructor.
 *
 * @api private
 */
function Router(handler) {
  if (!handler) { throw new TypeError('Router constructor requires a handler factory function'); }
  
  this._handler = handler;
  this._define = undefined;
  this._assist = undefined;
  
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
 *    bandsURL('counting-crows')
 *    // => "http://www.example.com/bands/counting-crows"
 *    bandsURL({ id: '507f1f77bcf86cd799439011' })
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
Router.prototype.match = function(pattern, shorthand, opts) {
  var options = opts;
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
    
    // TODO: Check if method exists in methods
    
    if (typeof shorthand === 'function' || Array.isArray(shorthand)) {
      var callbacks = utils.flatten([].slice.call(arguments, 1));
      // pop off any final options argument
      if (typeof callbacks[callbacks.length - 1] != 'function') { callbacks.pop(); }
    
      // Mount functions or arrays of functions directly as Express route
      // handlers/middleware.
      this.define(method, path, callbacks);
    } else {
      this._route(method, path, controller, action, { helper: helper });
    }
  }
}

/**
 * Create resourceful routes for singleton resource `name`.
 *
 * A resourceful route provides a mapping between HTTP methods and URLs to
 * corresponding controller actions.  A single entry in the route configuration,
 * such as:
 *
 *     this.resource('profile');
 *
 * creates six different routes in the application, all handled by
 * `profileController` (note that the controller is singular).
 *
 *     GET     /profile/new   -> new()
 *     POST    /profile       -> create()
 *     GET     /profile       -> show()
 *     GET     /profile/edit  -> edit()
 *     PUT     /profile       -> update()
 *     DELETE  /profile       -> destroy()
 *
 * Additionally, path and URL routing helpers will be dynamically declared.
 *
 *     profilePath()
 *     // => "/profile"
 *     newProfilePath()
 *     // => "/profile/new"
 *     editAccountPath()
 *     // => "/profile/edit"
 *
 *     profileURL()
 *     // => "http://www.example.com/profile"
 *     newProfileURL()
 *     // => "http://www.example.com/profile/new"
 *     editAccountURL()
 *     // => "http://www.example.com/profile/edit"
 *
 * The singleton variation of a resourceful route is useful for resources which
 * are referenced without an ID, such as /profile, which always shows the
 * profile of the currently logged in user.  In this case, a singular resource
 * maps /profile (rather than /profile/:id) to the show action.
 * 
 * Examples:
 *
 *     this.resource('profile');
 *
 * @param {String} name
 * @api public
 */
Router.prototype.resource = function(name, options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }
  options = options || {}
  
  var actions = [ 'new', 'create', 'show', 'edit', 'update', 'destroy' ]
    , ns = this._ns[this._ns.length - 1]
    , path = ns.qpath(name)
    , controller = ns.qcontroller(name)
    , helper = ns.qhelper(name);
  
  if (options.only) {
    actions = Array.isArray(options.only) ? options.only : [ options.only ];
  } else if (options.except) {
    var except = Array.isArray(options.except) ? options.except : [ options.except ];
    actions = actions.filter(function(a) {
      return except.indexOf(a) == -1;
    });
  }
  
  var self = this;
  actions.forEach(function(action) {
    switch (action) {
      case 'new':     self._route('get' , path + '/new.:format?' , controller, 'new'     , { helper: utils.helperize('new', helper) });
        break;
      case 'create':  self._route('post', path                   , controller, 'create' );
        break;
      case 'show':    self._route('get' , path + '.:format?'     , controller, 'show'    , { helper: helper });
        break;
      case 'edit':    self._route('get' , path + '/edit.:format?', controller, 'edit'    , { helper: utils.helperize('edit', helper) });
        break;
      case 'update':  self._route('put' , path                   , controller, 'update' );
        break;
      case 'destroy': self._route('del' , path                   , controller, 'destroy');
        break;
    }
  });
  
  this.namespace(name, { module: options.namespace ? name : null, helper: name }, function() {
    fn && fn.call(this);
  });
}

/**
 * Create resourceful routes for collection resource `name`.
 *
 * A resourceful route provides a mapping between HTTP methods and URLs to
 * corresponding controller actions.  A single entry in the route configuration,
 * such as:
 *
 *     this.resources('photos');
 *
 * creates seven different routes in the application, executed by
 * `photosController`.
 *
 *     GET     /photos           -> index()
 *     GET     /photos/new       -> new()
 *     POST    /photos           -> create()
 *     GET     /photos/:id       -> show()
 *     GET     /photos/:id/edit  -> edit()
 *     PUT     /photos/:id       -> update()
 *     DELETE  /photos/:id       -> destroy()
 *
 * Additionally, path and URL routing helpers will be dynamically declared.
 *
 *     photosPath()
 *     // => "/photos"
 *     photoPath('abc123')
 *     // => "/photos/abc123"
 *     newPhotoPath()
 *     // => "/photos/new"
 *     editPhotoPath('abc123')
 *     // => "/photos/abc123/edit"
 *
 * Resources can also be nested infinately using callback syntax:
 *
 *     router.resources('bands', function() {
 *       this.resources('albums');
 *     });
 * 
 * Examples:
 *
 *     this.resources('photos');
 *
 * @param {String} name
 * @api public
 */
Router.prototype.resources = function(name, options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }
  options = options || {}
  
  var actions = [ 'index', 'new', 'create', 'show', 'edit', 'update', 'destroy' ]
    , ns = this._ns[this._ns.length - 1]
    , singular = inflect.singularize(name)
    , path = ns.qpath(name)
    , controller = ns.qcontroller(name)
    , helper = ns.qhelper(singular)
    , collectionHelper = ns.qhelper(name)
    , placeholder;
  
  if (options.only) {
    actions = Array.isArray(options.only) ? options.only : [ options.only ];
  } else if (options.except) {
    var except = Array.isArray(options.except) ? options.except : [ options.except ];
    actions = actions.filter(function(a) {
      return except.indexOf(a) == -1;
    });
  }
  
  var self = this;
  actions.forEach(function(action) {
    switch (action) {
      case 'index':   self._route('get' , path + '.:format?'         , controller, 'index'   , { helper: collectionHelper });
        break;
      case 'new':     self._route('get' , path + '/new.:format?'     , controller, 'new'     , { helper: utils.helperize('new', helper) });
        break;
      case 'create':  self._route('post', path                       , controller, 'create' );
        break;
      case 'show':    self._route('get' , path + '/:id.:format?'     , controller, 'show'    , { helper: helper });
        break;
      case 'edit':    self._route('get' , path + '/:id/edit.:format?', controller, 'edit'    , { helper: utils.helperize('edit', helper) });
        break;
      case 'update':  self._route('put' , path + '/:id'              , controller, 'update' );
        break;
      case 'destroy': self._route('del' , path + '/:id'              , controller, 'destroy');
        break;
    }
  });
  
  placeholder = ':' + utils.helperize(singular) + '_id';
  this.namespace(name + '/' + placeholder, { module: options.namespace ? name : null, helper: singular }, function() {
    fn && fn.call(this);
  });
}

/**
 * Create namespace in which to organize routes.
 *
 * Typically, you might want to group administrative routes under an `admin`
 * namespace.  Controllers for these routes would be placed in the `app/controllers/admin`
 * directory.
 *
 * A namespace with resourceful routes, such as:
 *
 *     this.namespace('admin', function() {
 *       this.resources('posts');
 *     });
 *
 * creates namespaced routes handled by `admin/postsController`:
 *
 *     GET     /admin/posts
 *     GET     /admin/posts/new
 *     POST    /admin/posts
 *     GET     /admin/posts/:id
 *     GET     /admin/posts/:id/edit
 *     PUT     /admin/posts/:id
 *     DELETE  /admin/posts/:id
 *
 * @param {String} name
 * @param {Function} fn
 * @api public
 */
Router.prototype.namespace = function(name, options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }
  options = options || {};
  
  var ns = this._ns[this._ns.length - 1];
  this._ns.push(new Namespace(name, options, ns));
  fn.call(this);
  this._ns.pop();
}


/**
 * Registers a function used to define routes in an underling server.
 *
 * When declaring routes, `Router` creates handler functions bound to a
 * controller action.  It is the responsiblity of the framework making use of
 * `Router` to then mount these functions in a manner in which they can be
 * invoked by the underlying server.
 *
 * For instance, Locomotive mounts handlers using Express.
 *
 * Examples:
 *
 *     var app = express();
 *     
 *     router.define(function(method, path, callbacks) {
 *       app[method](path, callbacks);
 *     });
 *
 * @param {Function} method
 * @api public
 */
Router.prototype.define = function(method, pattern, callbacks) {
  if (typeof method === 'function') {
    this._define = method;
    return this;
  }
  
  if (!this._define) { throw new Error('Router is unable to define routes'); }
  this._define.apply(undefined, arguments);
}

/**
 * Registers a function used to assist routing in an application.
 *
 * @param {Function} name
 * @api public
 */
Router.prototype.assist = function(name, entry) {
  if (typeof name === 'function') {
    this._assist = name;
    return this;
  }
  
  if (!this._assist) { return; }
  this._assist.apply(undefined, arguments);
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
  
  // Define a route handler that dispatches to a controller action.
  this.define(method, pattern, this._handler(controller, action));
  
  // Add the route to the reverse routing table.  The reverse routing table is
  // used by routing helper functions to construct URLs to a specific controller
  // action.  When building paths and URLs, routes declared first take priority.
  // Therefore, if there is already an entry for this controller action in the
  // table, don't overwrite it.
  var route = new Entry(controller, action, pattern);
  
  var key = route.key();
  if (!this._routes[key]) {
    this._routes[key] = route;
  }
  
  // Declare path and URL routing helper functions.
  if (options.helper) {
    var helper = options.helper;
    this.assist(helper, route);
    
    // TODO: Register helpers
    //this._app.helper(helper + 'Path', route.helper());
    //this._app.dynamicHelper(helper + 'URL', route.helper(true));
  }
}


/**
 * Expose `Router`.
 */
module.exports = Router;
