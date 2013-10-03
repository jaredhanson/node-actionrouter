var Namespace = require('../lib/namespace')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Namespace', function() {
  
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
      expect(ns.qcontroller('PhotosController')).to.equal('PhotosController');
    });
    
    it('should qualify helpers', function() {
      expect(ns.qhelper('photos')).to.equal('photos');
    });
    
    it('should qualify paths', function() {
      expect(ns.qpath('photos')).to.equal('/photos');
      expect(ns.qpath('/photos')).to.equal('/photos');
    });
  });
  
});
