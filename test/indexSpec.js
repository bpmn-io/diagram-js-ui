import * as preactExports from 'preact';
import * as preactHooksExports from 'preact/hooks';

import * as htmExports from 'htm/preact';

import * as duiExports from '..';


describe('diagram-js-ui', function() {

  describe('preact exports', function() {

    verifyExports(preactExports);

  });


  describe('preact/hooks exports', function() {

    verifyExports(preactHooksExports);

  });


  describe('htm exports', function() {

    verifyExports(htmExports);

  });

});


// helpers //////////////

function verifyExports(expectedExports) {

  Object.entries(expectedExports).map(([ name, value ]) => {

    it(`should export ${ name }`, function() {
      expect(duiExports[name], `export <${ name }>`).to.equal(value);
    });
  });

}