import { html, render } from '../lib/diagramJSui';


describe('diagramJSui', function() {

  it('#html', function() {

    // given
    const htmlElement = html`<div>Hello world!</div>`;

    expect(htmlElement).to.exist;
    expect(htmlElement.type).to.equal('div');
  });


  it('#render', function() {

    // given
    const htmlElement = html`<div>Hello world!</div>`;

    // when
    render(htmlElement, document.body);

    // expect
    const div = document.querySelector('div');
    expect(div).to.exist;
    expect(div.innerText).to.eql('Hello world!');

  });


  it('#render - custom component', function() {

    // given
    function CustomComponent() {
      return html`<div>Hello world!</div>`;
    }

    // when
    render(
      html`<${CustomComponent} />`,
      document.body
    );

    // expect
    const div = document.querySelector('div');
    expect(div).to.exist;
    expect(div.innerText).to.eql('Hello world!');

  });

});
