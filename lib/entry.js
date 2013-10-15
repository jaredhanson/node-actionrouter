/**
 * `Entry` constructor.
 *
 * An entry is conceptually a reverse route, used to map from a controller
 * action to the URL pattern which dispatches to it.
 *
 * @api private
 */
function Entry(controller, action, pattern) {
  this.controller = controller;
  this.action = action;
  this.pattern = pattern;
  normalize(pattern, this.keys = []);
};

/**
 * Routing key.
 *
 * A routing key is used to map from a controller action to a URL pattern.
 *
 * @return {String}
 * @api protected
 */
Entry.prototype.key = function() {
  return this.controller + '#' + this.action;
}

/**
 * Build path.
 *
 * Builds a path for the entry, substituting any placeholders with the
 * corresponding value from `options`.
 *
 * @param {Object} options
 * @return {String}
 * @api protected
 */
Entry.prototype.path = function(options) {
  var self = this;
  var path = this.pattern;
  this.keys.forEach(function(key) {
    if (!key.optional) {
      if (!options[key.name]) { throw new Error('Unable to substitute :' + key.name + ' in route pattern ' + self.pattern); }
      path = path.replace(':' + key.name, options[key.name]);
    } else {
      var replacement = options[key.name] ? '$1' + options[key.name] : '';
      path = path.replace(new RegExp('(\\.?\\/?):' + key.name + '\\?'), replacement);
    }
  });
  
  return path;
}


/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp} path
 * @param  {Array} keys
 * @param  {Boolean} sensitive
 * @param  {Boolean} strict
 * @return {RegExp}
 * @api private
 *
 * CREDIT: https://github.com/visionmedia/express/blob/2.5.0/lib/router/route.js
 */

function normalize(path, keys, sensitive, strict) {
  if (path instanceof RegExp) return path;
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
      keys.push({ name: key, optional: !! optional });
      slash = slash || '';
      return ''
        + (optional ? '' : slash)
        + '(?:'
        + (optional ? slash : '')
        + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
        + (optional || '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}


/**
 * Expose `Entry`.
 */
module.exports = Entry;
