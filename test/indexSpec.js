import {
  html,
  render,
  h,
  Component,
  useState,
  useCallback,
  useLayoutEffect
} from '..';


describe('diagram-js-ui', function() {

  Object.entries({
    html,
    render,
    Component,
    h,
    useState,
    useCallback,
    useLayoutEffect
  }).map(([ name, value ]) => {

    it(`should export ${ name }`, function() {
      expect(value, `export <${ name }>`).to.exist;
    });

  });

});
