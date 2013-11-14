/* global describe, it, expect */

var Namespace = require('../lib/namespace');
  

describe('Namespace', function() {
  
  describe('constructed with no arguments', function() {
    var ns = new Namespace();
    
    it('should have empty name property', function() {
      expect(ns.name).to.equal('');
    });
    
    it('should have empty module property', function() {
      expect(ns.module).to.equal('');
    });
    
    it('should have empty method property', function() {
      expect(ns.method).to.equal('');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/photos');
      expect(ns.qpath('/photos')).to.equal('/photos');
      expect(ns.qpath('/photos/')).to.equal('/photos/');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('photos');
    });
    
    it('should qualify function', function() {
      expect(ns.qfunction('photos')).to.equal('photos');
      expect(ns.qfunction('edit_photos')).to.equal('editPhotos');
    });
  });
  
  describe('constructed with options argument', function() {
    var ns = new Namespace({ separator: ':' });
    
    it('should have empty name property', function() {
      expect(ns.name).to.equal('');
    });
    
    it('should have empty module property', function() {
      expect(ns.module).to.equal('');
    });
    
    it('should have empty method property', function() {
      expect(ns.method).to.equal('');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal(':photos');
      expect(ns.qpath(':photos')).to.equal(':photos');
      expect(ns.qpath(':photos:')).to.equal(':photos:');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('photos');
    });
    
    it('should qualify function', function() {
      expect(ns.qfunction('photos')).to.equal('photos');
      expect(ns.qfunction('edit_photos')).to.equal('editPhotos');
    });
  });
  
  describe('constructed with name', function() {
    var ns = new Namespace('foo');
    
    it('should have name property', function() {
      expect(ns.name).to.equal('foo');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('foo');
    });
    
    it('should have method property', function() {
      expect(ns.method).to.equal('foo');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos/')).to.equal('/foo/photos/');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('foo/photos');
    });
    
    it('should qualify function', function() {
      expect(ns.qfunction('photos')).to.equal('fooPhotos');
      expect(ns.qfunction('edit_photos')).to.equal('fooEditPhotos');
    });
  });
  
  describe('constructed with name and module option', function() {
    var ns = new Namespace('foo', { module: 'Bar' });
    
    it('should have name property', function() {
      expect(ns.name).to.equal('foo');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('bar');
    });
    
    it('should have method property', function() {
      expect(ns.method).to.equal('foo');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos/')).to.equal('/foo/photos/');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('bar/photos');
    });
    
    it('should qualify function', function() {
      expect(ns.qfunction('photos')).to.equal('fooPhotos');
      expect(ns.qfunction('edit_photos')).to.equal('fooEditPhotos');
    });
  });
  
  describe('constructed with name and method option', function() {
    var ns = new Namespace('foo', { method: 'bar' });
    
    it('should have name property', function() {
      expect(ns.name).to.equal('foo');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('foo');
    });
    
    it('should have method property', function() {
      expect(ns.method).to.equal('bar');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos/')).to.equal('/foo/photos/');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('foo/photos');
    });
    
    it('should qualify function', function() {
      expect(ns.qfunction('photos')).to.equal('barPhotos');
      expect(ns.qfunction('edit_photos')).to.equal('barEditPhotos');
    });
  });
  
  describe('constructed with name and null module option', function() {
    var ns = new Namespace('foo', { module: null });
    
    it('should have name property', function() {
      expect(ns.name).to.equal('foo');
    });
    
    it('should have empty module property', function() {
      expect(ns.module).to.equal('');
    });
    
    it('should have method property', function() {
      expect(ns.method).to.equal('foo');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos/')).to.equal('/foo/photos/');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('photos');
    });
    
    it('should qualify function', function() {
      expect(ns.qfunction('photos')).to.equal('fooPhotos');
      expect(ns.qfunction('edit_photos')).to.equal('fooEditPhotos');
    });
  });
  
  describe('constructed with name and separator option', function() {
    var ns = new Namespace('foo', { separator: ':' });
    
    it('should have name property', function() {
      expect(ns.name).to.equal('foo');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('foo');
    });
    
    it('should have method property', function() {
      expect(ns.method).to.equal('foo');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal(':foo:photos');
      expect(ns.qpath(':photos')).to.equal(':foo:photos');
      expect(ns.qpath(':photos:')).to.equal(':foo:photos:');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('foo/photos');
    });
    
    it('should qualify function', function() {
      expect(ns.qfunction('photos')).to.equal('fooPhotos');
      expect(ns.qfunction('edit_photos')).to.equal('fooEditPhotos');
    });
  });
  
  describe('constructed with parent', function() {
    var net = new Namespace('net');
    var http = new Namespace('http', {}, net);
    
    it('should have name property', function() {
      expect(http.name).to.equal('http');
    });
    
    it('should have module property', function() {
      expect(http.module).to.equal('http');
    });
    
    it('should have method property', function() {
      expect(http.method).to.equal('http');
    });
    
    it('should have parent', function() {
      expect(http.parent).to.be.an('object');
    });
    
    it('should qualify paths', function() {
      expect(http.qpath('proxies')).to.equal('/net/http/proxies');
      expect(http.qpath('/proxies')).to.equal('/net/http/proxies');
      expect(http.qpath('/proxies/')).to.equal('/net/http/proxies/');
    });
    
    it('should qualify controller', function() {
      expect(http.qcontroller('ProxiesController')).to.equal('net/http/proxies');
    });
    
    it('should qualify function', function() {
      expect(http.qfunction('proxies')).to.equal('netHttpProxies');
      expect(http.qfunction('edit_proxies')).to.equal('netHttpEditProxies');
    });
  });
  
  describe('constructed with parent and separator option', function() {
    var net = new Namespace('net', { separator: ':' });
    // `separator` option on child namespace should have no effect
    var http = new Namespace('http', { separator: '_' }, net);
    
    it('should have name property', function() {
      expect(http.name).to.equal('http');
    });
    
    it('should have module property', function() {
      expect(http.module).to.equal('http');
    });
    
    it('should have method property', function() {
      expect(http.method).to.equal('http');
    });
    
    it('should have parent', function() {
      expect(http.parent).to.be.an('object');
    });
    
    it('should qualify paths', function() {
      expect(http.qpath('proxies')).to.equal(':net:http:proxies');
      expect(http.qpath(':proxies')).to.equal(':net:http:proxies');
      expect(http.qpath(':proxies:')).to.equal(':net:http:proxies:');
    });
    
    it('should qualify controller', function() {
      expect(http.qcontroller('ProxiesController')).to.equal('net/http/proxies');
    });
    
    it('should qualify function', function() {
      expect(http.qfunction('proxies')).to.equal('netHttpProxies');
      expect(http.qfunction('edit_proxies')).to.equal('netHttpEditProxies');
    });
  });
  
});
