import diagramJSuiModule from '../';

import {
  bootstrapDiagram,
  inject
} from 'diagram-js/test/helper';


describe('diagramJSui', function() {

  beforeEach(bootstrapDiagram({
    modules: [ diagramJSuiModule ]
  }));


  it('should bootstrap with module', inject(function(diagramJSui) {
    expect(diagramJSui).not.to.be.undefined;
  }));


  it('#html', inject(function(diagramJSui) {

    // given
    const htmlElement = diagramJSui.html`<div>Hello world!</div>`;

    expect(htmlElement).to.exist;
    expect(htmlElement.type).to.equal('div');
  }));


  it('#render', inject(function(diagramJSui) {

    // given
    const htmlElement = diagramJSui.html`<div>Hello world!</div>`;

    // when
    diagramJSui.render(htmlElement, document.body);

    // expect
    const div = document.querySelector('div');
    expect(div).to.exist;
    expect(div.innerText).to.eql('Hello world!');

  }));


  it('#render - custom component', inject(function(diagramJSui) {

    // given
    function CustomComponent({ html }) {
      return html`<div>Hello world!</div>`;
    }

    // when
    diagramJSui.render(
      diagramJSui.html`
        <${CustomComponent} html=${diagramJSui.html} />
      `,
      document.body
    );

    // expect
    const div = document.querySelector('div');
    expect(div).to.exist;
    expect(div.innerText).to.eql('Hello world!');

  }));


  it('#getHooks', inject(function(diagramJSui) {

    // given
    const hooks = diagramJSui.getHooks();

    // expect
    expect(Object.keys(hooks)).to.have.members([
      'useRef',
      'useLayoutEffect',
      'useCallback',
      'useEffect',
      'useState'
    ]);

  }));

});
