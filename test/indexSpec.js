import * as preactExports from 'preact';
import * as preactHooksExports from 'preact/hooks';

import * as htmExports from 'htm/preact';

import * as duiExports from '@bpmn-io/diagram-js-ui';


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

/**
 * @param {Record<string, any>} expectedExports
 */
function verifyExports(expectedExports) {

  Object.entries(expectedExports).map(([ name, value ]) => {

    it(`should export ${ name }`, function() {
      expect(/** @type { any } */ (duiExports)[name], `export <${ name }>`).to.equal(value);
    });

  });

}