const assert = require('chai').assert;
const spin = require('../.');

describe('String content spinner', function() {
  describe('spin function', function() {
    it('should be a function', function() {
      const actual = typeof spin;
      const expected = 'function';

      assert.equal(actual, expected);
    });
    it('should have a factory property', function() {
      const actual = typeof spin.factory;
      const expected = 'function';

      assert.equal(actual, expected);
    });

    it('should spin content when called', function() {
      const actual = '{1|2}';
      const notExpected = actual;

      assert.notEqual(spin(actual), notExpected);
    });

    it('should spin content even if there is only one element', function() {
      const actual = '{1}';
      const expected = '1';

      assert.equal(spin(actual), expected);
    });

    it('should spin content', function() {
      const actual = ' {Hi|Hello|Hey} ';
      const possibleResults = [' Hi ', ' Hello ', ' Hey '];

      assert.isAbove(possibleResults.indexOf(spin(actual)), -1);
    });

    it('should predictably spin content with the same provided seed', function() {
      const actual = ' {Hi|Hello|Hey} ';

      assert.equal(spin(actual, 'example'), ' Hello ');
      assert.equal(spin(actual, 'Hello World'), ' Hi ');
      assert.equal(spin(actual, 'r4ndom $tr!ng?'), ' Hey ');
    });

    it('should spin content recursively', function() {
      const actual = '{ H{i|ey} | Hello }';
      const possibleResults = [' Hi ', ' Hello ', ' Hey '];

      assert.isAbove(possibleResults.indexOf(spin(actual)), -1);
    });

    it('should return original string is called if nothing to spin', function() {
      const actual = 'Hello world';
      const expected = 'Hello world';

      assert.equal(spin(actual), expected);
    });
  });

  describe('factory function', function() {
    const factory = spin.factory;
    let newSpin;

    it('should be a function', function() {
      const actual = typeof factory;
      const expected = 'function';

      assert.equal(actual, expected);
    });

    it('should generate a new spin function when called', function() {
      newSpin = factory('[', ']', '/');
      const actual = typeof newSpin;
      const expected = 'function';

      assert.equal(actual, expected);
    });

    describe('generated spin function', function() {
      it('should also have a factory property', function() {
        const actual = typeof newSpin.factory;
        const expected = 'function';

        assert.equal(actual, expected);
      });

      it('should spin content using new markers', function() {
        const actual = '[1/1/1]';
        const expected = '1';

        assert.equal(newSpin(actual), expected);
      });

      it('should spin content recursively using new markers', function() {
        const actual = '[1/[1/1]/1]';
        const expected = '1';

        assert.equal(newSpin(actual), expected);
      });

      it('should not spin content with default markers', function() {
        const actual = '{1|1|1}';
        const expected = '{1|1|1}';

        assert.equal(newSpin(actual), expected);
      });
    });
  });
});
