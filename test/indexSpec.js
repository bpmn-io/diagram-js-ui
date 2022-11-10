import { html, render, useState } from '..';


describe('diagram-js-ui', function() {

  Object.entries({
    html,
    render,
    useState
  }).map(([ name, value ]) => {

    it(`should export ${ name }`, function() {
      expect(value, `export <${ name }>`).to.exist;
    });

  });

});
