var Namespace = require('../lib/namespace');
  

describe.skip('Namespace', function() {
  
  describe('constructed with no arguments', function() {
    var ns = new Namespace();
    
    it('should have empty path property', function() {
      expect(ns.path).to.equal('');
    });
    
    it('should have empty module property', function() {
      expect(ns.module).to.equal('');
    });
    
    it('should have empty helper property', function() {
      expect(ns.helper).to.equal('');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('photos');
    });
    
    it('should qualify helpers', function() {
      expect(ns.qhelper('photos')).to.equal('photos');
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/photos');
      expect(ns.qpath('/photos')).to.equal('/photos');
    });
  });
  
  describe('constructed with name', function() {
    var ns = new Namespace('foo');
    
    it('should have path property', function() {
      expect(ns.path).to.equal('foo');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('Foo');
    });
    
    it('should have helper property', function() {
      expect(ns.helper).to.equal('foo');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('foo/photos');
    });
    
    it('should qualify helpers', function() {
      expect(ns.qhelper('photos')).to.equal('fooPhotos');
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
    });
  });
  
  describe('constructed with name and module option', function() {
    var ns = new Namespace('foo', { module: 'Bar' });
    
    it('should have path property', function() {
      expect(ns.path).to.equal('foo');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('Bar');
    });
    
    it('should have helper property', function() {
      expect(ns.helper).to.equal('foo');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('bar/photos');
    });
    
    it('should qualify helpers', function() {
      expect(ns.qhelper('photos')).to.equal('fooPhotos');
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
    });
  });
  
  describe('constructed with name and helper option', function() {
    var ns = new Namespace('foo', { helper: 'bar' });
    
    it('should have path property', function() {
      expect(ns.path).to.equal('foo');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('Foo');
    });
    
    it('should have helper property', function() {
      expect(ns.helper).to.equal('bar');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('foo/photos');
    });
    
    it('should qualify helpers', function() {
      expect(ns.qhelper('photos')).to.equal('barPhotos');
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
    });
  });
  
  describe('constructed with name and null module option', function() {
    var ns = new Namespace('foo', { module: null });
    
    it('should have path property', function() {
      expect(ns.path).to.equal('foo');
    });
    
    it('should have empty module property', function() {
      expect(ns.module).to.equal('');
    });
    
    it('should have helper property', function() {
      expect(ns.helper).to.equal('foo');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.null;
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('PhotosController')).to.equal('photos');
    });
    
    it('should qualify helpers', function() {
      expect(ns.qhelper('photos')).to.equal('fooPhotos');
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/foo/photos');
      expect(ns.qpath('/photos')).to.equal('/foo/photos');
    });
  });
  
  describe('constructed with parent', function() {
    var parent = new Namespace('net');
    var ns = new Namespace('http', {}, parent);
    
    it('should have path property', function() {
      expect(ns.path).to.equal('http');
    });
    
    it('should have module property', function() {
      expect(ns.module).to.equal('Http');
    });
    
    it('should have helper property', function() {
      expect(ns.helper).to.equal('http');
    });
    
    it('should not have parent', function() {
      expect(ns.parent).to.be.an('object');
    });
    
    it('should qualify controller', function() {
      expect(ns.qcontroller('ProxiesController')).to.equal('net/http/proxies');
    });
    
    it('should qualify helpers', function() {
      expect(ns.qhelper('proxies')).to.equal('netHttpProxies');
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('proxies')).to.equal('/net/http/proxies');
      expect(ns.qpath('/proxies')).to.equal('/net/http/proxies');
    });
  });
  
});
