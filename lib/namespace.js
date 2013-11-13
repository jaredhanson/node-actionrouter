/**
 * Module dependencies.
 */
var path = require('path')
  , utils = require('./utils');


/**
 * `Namespace` constructor.
 *
 * @api private
 */
function Namespace(name, options, parent) {
  options = options || {};
  options.module = (options.module !== undefined) ? options.module : name;
  options.method = (options.method !== undefined) ? options.method : name;
  
  this.name = name || '';
  this.module = utils.moduleize(options.module) || '';
  this.method = utils.helperize(options.method) || '';
  this.parent = parent || null;
};

/**
 * Fully qualified path.
 *
 * @param {String} name
 * @return {String}
 * @api protected
 */
Namespace.prototype.qpath = function(name) {
  var qual = name;
  var ns = this;
  while (ns) {
    // qual = (ns.path.length) ? ((qual[0] === '/') ? (ns.path + qual) : (ns.path + '/' + qual)) : (qual);
    // TODO: Don't use path
    qual = (ns.name.length) ? path.join(ns.name, qual) : qual;
    ns = ns.parent;
  }
  qual = (qual[0] === '/') ? qual : ('/' + qual);
  return qual;
}

/**
 * Fully qualified module name.
 *
 * Contructs a fully qualified name for `controller`, including any module
 * segments of parent namespaces.  For instance, `postsController` within an
 * "admin" namespace would have a fully qualified name of
 * `admin/postsController`.
 *
 * @param {String} name
 * @return {String}
 * @api protected
 */
Namespace.prototype.qmodule = function(name) {
  var qual = utils.controllerize(name);
  var ns = this;
  while (ns) {
    // qual = (ns.module.length) ? (ns.module + '/' + qual) : (qual);
    // TODO: Don't use path
    qual = (ns.module.length) ? path.join(ns.module, qual) : qual;
    ns = ns.parent;
  }
  return qual;
}

/**
 * Fully qualified function name.
 *
 * Contructs a fully qualified function name, including any method components of
 * parent namespaces.  For instance, an "albums" resource nested under a "bands"
 * resource would yeild helpers in the form of `bandAlbumsPath`,
 * `newBandAlbumPath`, etc.
 *
 * @param {String} name
 * @return {String}
 * @api protected
 */
Namespace.prototype.qfunction = function(name) {
  var comps = [ name ];
  var ns = this;
  while (ns) {
    if (ns.method.length) { comps.unshift(ns.method); }
    ns = ns.parent;
  }
  return utils.helperize.apply(undefined, comps);
}


/**
 * Expose `Namespace`.
 */
module.exports = Namespace;
