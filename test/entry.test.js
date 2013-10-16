var Entry = require('../lib/entry');
  

describe('Entry', function() {
  
  describe('without placeholders', function() {
    var e = new Entry('account', 'show', '/account');
    
    it('should have controller and action properties', function() {
      expect(e.controller).to.equal('account');
      expect(e.action).to.equal('show');
    });
    
    it('should have pattern property', function() {
      expect(e.pattern).to.equal('/account');
    });
    
    it('should have keys property', function() {
      expect(e.keys).to.be.an('array');
      expect(e.keys).to.have.length(0);
    });
    
    it('should build key', function() {
      expect(e.key()).to.equal('account#show');
    });
    
    it('should build path', function() {
      expect(e.path()).to.equal('/account');
    });
  });
  
});
