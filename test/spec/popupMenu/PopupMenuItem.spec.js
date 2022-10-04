// test entry with description
// test entry with image

import { render, cleanup } from '@testing-library/preact';
import PopupMenuItem from 'src/popupMenu/PopupMenuItem';
import TestContainer from 'mocha-test-container-support';
import testImage from 'assets/a.png';
import {
  query as domQuery,
  queryAll as domQueryAll,
} from 'min-dom';


describe('<PopupMenuItem>', function() {
  let container, parent;

  beforeEach(function() {
    parent = TestContainer.get(this);

    container = document.createElement('div');

    container.classList.add('djs-popup-parent');
    parent.appendChild(container);
  });

  afterEach(function() {
    cleanup();
  });


  it('should add standard class to entry', function() {

    // given
    const entry = { id: '1' };

    // when
    createPopupMenu({ container, entry });

    // then
    expect(domQueryAll('.entry', container).length).to.eql(1);
  });


  it('should add custom class to entry if specified', function() {

    // given
    const entry = { id: '1', className: 'entry-1 cls2 cls3' };

    // when
    createPopupMenu({ container, entry });

    // then
    var element = domQuery('.entry-1', container);
    expect(element.className).to.eql('name entry-1 cls2 cls3');
  });


  it('should have label if specified', function() {

    // given
    const entry = { id: '1', label: 'Entry 1', className: 'entry-1 cls2 cls3' };

    // when
    createPopupMenu({ container, entry });

    // then
    var element = domQuery('.entry-1', container);
    expect(element.textContent).to.eql('Entry 1');
  });


  it('should add action-id to entry', function() {

    // given
    const entry = { id: 'undo', label: 'UNDO' };

    // when
    createPopupMenu({ container, entry });

    // then
    var entry1 = domQuery('.entry', container);

    expect(entry1.getAttribute('data-id')).to.eql('undo');
  });


  it('should add an image if specified', function() {

    // given
    const entry = { id: '1', imageUrl: testImage };

    // when
    createPopupMenu({ container, entry });

    // then
    var img = domQuery('[data-id="1"] img', container);

    expect(img).to.exist;
    expect(img.getAttribute('src')).to.eql(testImage);
  });


  it('should add description if specified', function() {

    // given
    const entry = { id: '1', description: 'entry 1 description' };

    // when
    createPopupMenu({ container, entry });

    // then
    var description = domQuery('.description', container);

    expect(description).to.exist;
    expect(description.textContent).to.eql('entry 1 description');
  });


  it('should NOT allow XSS via imageUrl', function() {

    // given
    const entry = { id: '1', imageUrl: '"><marquee />' };

    // when
    createPopupMenu({ container, entry });

    // then
    var injected = domQuery('marquee', container);
    expect(injected).not.to.exist;
  });

});


// helpers
function createPopupMenu(options) {
  const { container } = options;

  return render(
    <PopupMenuItem
      entry={ { id: 'foo', label: 'bar' } }
      selected={ false }
      { ...options }
    />,
    {
      container
    }
  );
}
